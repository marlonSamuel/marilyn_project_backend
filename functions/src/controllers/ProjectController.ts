import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { ProjectService } from '../services/ProjectService';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { IProjectDto } from '../services/dtos/ProjectDto';

@route('/projects')
export class ProjectController extends BaseController {
    constructor(private readonly projectService: ProjectService){
        super();
    }

    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getAll(req: Request, res: Response) {
        try {
            let data = await this.projectService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getById(req: Request, res: Response) {
        try {
            console.log("entro acá en get by id")
            const id = req.params.id;
            let data = await this.projectService.getById(parseInt(id));
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/metrics/dash')
    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getMetrics(req: Request, res: Response) {
        try {
            const project_id = req.query.project_id;

            let data = await this.projectService.getMetrics(project_id);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/env/:env')
    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getByEnviroment(req: Request, res: Response) {
        try {
            const env = req.params.env;
            let data = await this.projectService.getByEnviroment(env);
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    @before(
        [
        authMiddleware,

        check('name').notEmpty(),
        check('description').notEmpty(),
        check('start_date').notEmpty(),
        check('end_date').notEmpty(),
        check('repository_name').notEmpty(),
        check('url_repository').notEmpty(),
        
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: IProjectDto = req.body;
            await this.projectService.create(body);
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
            let data: IProjectDto = req.body;
            await this.projectService.update(id,data);
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
            await this.projectService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}