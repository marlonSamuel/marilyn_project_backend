import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { IMilestoneDto } from '../services/dtos/MilestoneDto';
import { MilestoneService } from '../services/MilestoneService';

@route('/milestones')
export class MilestoneController extends BaseController {
    constructor(private readonly milestoneService: MilestoneService){
        super();
    }

    @GET()
    @before([authMiddleware])
    public async getAll(req: Request, res: Response) {
        try {
            let data = await this.milestoneService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:project_id')
    @GET()
    @before([authMiddleware])
    public async getByProject(req: Request, res: Response) {
        try {
            let project_id = parseInt(req.params.project_id);
            let data = await this.milestoneService.getByProject(project_id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/milestone/:id')
    @GET()
    @before([authMiddleware])
    public async getById(req: Request, res: Response) {
        try {
            let id = parseInt(req.params.id);
            let data = await this.milestoneService.getById(id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }
    

    @POST()
    @before(
        [
        authMiddleware,
        
        check('project_id').notEmpty(),
        check('name').notEmpty(),
        check('description').notEmpty(),
        check('start_date').notEmpty(),
        check('end_date').notEmpty(),
        
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: IMilestoneDto = req.body;
            await this.milestoneService.create(body);
            res.status(200).send();
        } catch (error) {
            this.handleException(error, res)
        }
    }

    @route('/:id')
    @PUT()
    @before(
        [
        authMiddleware,

        check('name').notEmpty(),
        check('description').notEmpty(),
        check('start_date').notEmpty(),
        check('end_date').notEmpty(),
        check('status').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: IMilestoneDto = req.body;
            await this.milestoneService.update(id,data);
            return res.status(200).send();
        } catch (error) {   
            this.handleException(error,res)
        }
    }

    @route('/:id')
    @DELETE()
    @before([authMiddleware])
    public async destroy(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            await this.milestoneService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}