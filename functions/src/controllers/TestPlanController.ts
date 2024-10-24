import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { TestPlanService } from '../services/TestPlanService';
import { ITestPlanDto } from '../services/dtos/TestPlan';

@route('/testplans')
export class TestPlanController extends BaseController {
    constructor(private readonly testPlanService: TestPlanService){
        super();
    }

    @GET()
    @before([authMiddleware])
    public async getAll(req: Request, res: Response) {
        try {
            let data = await this.testPlanService.getAll();
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
            let data = await this.testPlanService.getByProject(project_id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/getById/:id')
    @GET()
    @before([authMiddleware])
    public async getById(req: Request, res: Response) {
        try {
            let id = parseInt(req.params.id);
            let data = await this.testPlanService.getById(id);
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
        check('assigned_to').notEmpty(),
        check('name').notEmpty(),
        check('description').notEmpty(),
        check('acceptance_criteria').notEmpty(),
        
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: ITestPlanDto = req.body;
            const user = req.user;
            body.created_by = user!.user.id;
            await this.testPlanService.create(body);
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
        
        check('assigned_to').notEmpty(),
        check('name').notEmpty(),
        check('description').notEmpty(),
        check('status').notEmpty(),
        check('acceptance_criteria').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: ITestPlanDto = req.body;
            await this.testPlanService.update(id,data);
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
            await this.testPlanService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}