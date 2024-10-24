import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { NoteService } from '../services/NoteService';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { INoteDto } from '../services/dtos/NoteDto';
import { authMiddleware } from '../common/middlewares/auth.middleware';

@route('/notes')
export class NoteController extends BaseController {
    
    constructor(private readonly noteService: NoteService){
        super();
    }

    @route('/:task_id')
    @GET()
    @before(
        [
        authMiddleware
    ])
    public async getAll(req: Request, res: Response) {
        try {
            const task_id = req.params.task_id;
            let data = await this.noteService.getByTask(parseInt(task_id));
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    @before([
        authMiddleware,
        check('description').notEmpty(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: INoteDto = req.body;
            const user = req.user;
            body.user_id = user!.user.id;
            await this.noteService.create(body);
            res.status(200).send();
        } catch (error) {
            this.handleException(error, res)
        }
    }

    @route('/:id')
    @PUT()
    @before([
        authMiddleware,
        check('description').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: INoteDto = req.body;
            await this.noteService.update(id,data);
            return res.status(200).send();
        } catch (error) {   
            this.handleException(error,res)
        }
    }

    @route('/:id')
    @DELETE()
    @before([
        authMiddleware
    ])
    public async destroy(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            await this.noteService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}