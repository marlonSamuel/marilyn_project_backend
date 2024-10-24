import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { IDefectDto } from '../services/dtos/Defect';
import { DefectService } from '../services/DefectService';

@route('/defects')
export class DefectController extends BaseController {
    constructor(private readonly defectService: DefectService){
        super();
    }

    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getAll(req: Request, res: Response) {
        try {
            let data = await this.defectService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    
    @route('/:test_case_id')
    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getByTestCase(req: Request, res: Response) {
        try {
            const testcase_id = req.params.test_case_id;
            
            let data = await this.defectService.getByTestCase(parseInt(testcase_id));
            console.log(data)
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    @before(
        [
        authMiddleware,
        check('test_case_id').notEmpty(),
        check('description').notEmpty(),
        check('assigned_to').notEmpty(),
        
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: IDefectDto = req.body;
            const user = req.user;
            console.log(body)
            await this.defectService.create(body);
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
        check('description').notEmpty(),
        check('severity').notEmpty(),
        check('status').notEmpty(),
        check('assigned_to').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: IDefectDto = req.body;
            await this.defectService.update(id,data);
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
            await this.defectService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}