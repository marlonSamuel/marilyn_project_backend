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
                
            } else if (eventType === 'workflow_job') {

                return res.status(200).send('Información del workflow job procesada');
            }

            res.status(200).send('Integración procesada');
    
            
        } catch (error) {
            this.handleException(error,res)
        }
        
    }
}