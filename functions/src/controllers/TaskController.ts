import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { ITaskDto } from '../services/dtos/TaskDto';
import { TaskService } from '../services/TaskService';

@route('/tasks')
export class TaskController extends BaseController {
    constructor(private readonly taskService: TaskService){
        super();
    }

    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getAll(req: Request, res: Response) {
        try {
            const user_id = req.query.user_id;
            const project_id = req.query.project_id;
            let data = await this.taskService.getAll(user_id, project_id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:milestone_id')
    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getByMilestone(req: Request, res: Response) {
        try {
            let milestone_id = parseInt(req.params.milestone_id);
            const user_id = req.query.user_id;
            const project_id = req.query.project_id;
            let data = await this.taskService.getByMilestone(milestone_id, user_id, project_id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/childs/:parent_id')
    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getByParent(req: Request, res: Response) {
        try {
            let parent_id = parseInt(req.params.parent_id);
            const user_id = req.query.user_id;
            const project_id = req.query.project_id;
            let data = await this.taskService.getByParent(parent_id, user_id, project_id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }


    @POST()
    @before(
        [
        authMiddleware,
        
        check('assigned_to').notEmpty(),
        check('name').notEmpty(),
        check('description').notEmpty(),
        check('start_date').notEmpty(),
        check('end_date').notEmpty(),
        check('estimated_hours').notEmpty(),
        
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: ITaskDto = req.body;
            await this.taskService.create(body);
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
        check('start_date').notEmpty(),
        check('end_date').notEmpty(),
        check('status').notEmpty(),
        check('estimated_hours').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: ITaskDto = req.body;
            await this.taskService.update(id,data);
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
            await this.taskService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}