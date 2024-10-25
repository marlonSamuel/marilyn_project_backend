import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { IDefectDto } from '../services/dtos/Defect';
import { DefectService } from '../services/DefectService';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';
import { IntegrationService } from '../services/IntegrationService';
import { IntegrationDto } from '../services/dtos/Integration';
import { IWorkflowJob } from '../services/dtos/IworkflowJob';
const crypto = require('crypto');

@route('/integrations')
export class IntegrationController extends BaseController {

     // Secreto para verificar el origen del webhook
     secret = 'secret';

    constructor(private readonly integrationService: IntegrationService){
        super();
    }

    public verifyGitHubSignature(req : Request, res: Response, next: Next) {
        const signature = req.headers['x-hub-signature-256'];
        const payload = JSON.stringify(req.body);
        const hmac = crypto.createHmac('sha256', this.secret);
        const digest = `sha256=${hmac.update(payload).digest('hex')}`;

        if (signature !== digest) {
            return res.status(401).send('Signature mismatch');
        }

        next();
    }

    @POST()
    @before(
        [
        
    ])
    public async integration(req: Request, res: Response) {

        try {
            const data = req.body;
            // Obtén el encabezado X-GitHub-Event
            const eventType = req.headers['x-github-event'];
    
            // Aquí manejas los datos del webhook según el evento que seleccionaste
            if (eventType === 'push') {
                const integrationData = {
                    ref: data.ref,
                    _before: data.before,
                    _after: data.after,
                    repositoryId: data.repository.id,
                    repositoryName: data.repository.name,
                    repositoryFullName: data.repository.full_name,
                    pusherName: data.pusher.name,
                    pusherEmail: data.pusher.email,
                    commitMessage: data.head_commit.message,
                    commitTimestamp: data.head_commit.timestamp,
                    commitUrl: data.head_commit.url, // URL del commit (general)
                    commitId: data.head_commit.id
                  } as IntegrationDto;
    
                  await this.integrationService.create(integrationData);

                  return res.status(200).send('Informacion del push procesada');
                
            } else if (eventType === 'workflow_job' && data.action === 'completed') {

                const job = data.workflow_job;

                const job_data = {
                    job_id: job.id,
                    run_id: job.run_id,
                    workflow_name: job.workflow_name,
                    head_branch: job.head_branch,
                    run_url: job.run_url,
                    run_attempt: 1,
                    node_id: job.node_id,
                    url: job.url,
                    html_url: job.html_url,
                    status: job.status,
                    conclusion: job.conclusion,
                    created_at: job.created_at,
                    started_at: job.started_at,
                    completed_at: job.completed_at,
                    name: job.name,
                    steps: JSON.stringify(job.steps)
                } as IWorkflowJob;

                await this.integrationService.createWorkFlowJob(job_data, data.repository.name,)

                return res.status(200).send('Información del workflow job procesada');
            }

            res.status(200).send('Integración procesada');
    
            
        } catch (error) {
            this.handleException(error,res)
        }
        
    }
}