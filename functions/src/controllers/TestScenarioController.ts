import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { ITestScenarioDto } from '../services/dtos/TestScenario';
import { TestScenarioService } from '../services/TestScenearioService';

@route('/testscenaries')
export class TestScenarioController extends BaseController {
    constructor(private readonly testScenarioService: TestScenarioService){
        super();
    }

    @GET()
    @before([authMiddleware])
    public async getAll(req: Request, res: Response) {
        try {
            let data = await this.testScenarioService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:testplan_id')
    @GET()
    @before([authMiddleware])
    public async getByTestPlan(req: Request, res: Response) {
        try {
            let testplan_id = parseInt(req.params.testplan_id);
            let data = await this.testScenarioService.getByTestPlan(testplan_id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    @before(
        [
        authMiddleware,
        
        check('testplan_id').notEmpty(),
        check('name').notEmpty(),
        check('description').notEmpty(),
        
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: ITestScenarioDto = req.body;
            await this.testScenarioService.create(body);
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
        check('status').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: ITestScenarioDto = req.body;
            await this.testScenarioService.update(id,data);
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
            await this.testScenarioService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}