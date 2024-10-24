import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { ITestCaseDto } from '../services/dtos/TestCase';
import { TestCaseService } from '../services/TestCaseService';

@route('/testcases')
export class TestCaseController extends BaseController {
    constructor(private readonly testCaseService: TestCaseService){
        super();
    }

    @GET()
    @before([authMiddleware])
    public async getAll(req: Request, res: Response) {
        try {
            let data = await this.testCaseService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    
    @route('/:scenario_id')
    @GET()
    @before([authMiddleware])
    public async getBySceneario(req: Request, res: Response) {
        try {
            let scenario_id = parseInt(req.params.scenario_id);
            let data = await this.testCaseService.getByScenarie(scenario_id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    @before(
        [
        authMiddleware,
        
        check('scenario_id').notEmpty(),
        check('name').notEmpty(),
        check('description').notEmpty(),
        check('status').notEmpty(),
        check('test_data').notEmpty(),
        check('expected_result').notEmpty(),
        
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: ITestCaseDto = req.body;
            await this.testCaseService.create(body);
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
        check('test_data').notEmpty(),
        check('status').notEmpty(),
        check('expected_result').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: ITestCaseDto = req.body;
            await this.testCaseService.update(id,data);
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
            await this.testCaseService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}