import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/BaseConotroller';
import { UserService } from '../services/UserService';
import { IUserDto } from '../services/dtos/IUserDto';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';
import { authMiddleware } from '../common/middlewares/auth.middleware';

@route('/users')
export class DefaultController extends BaseController {
    constructor(private readonly userService: UserService){
        super();
    }

    @GET()
    public async getAll(req: Request, res: Response) {
        try {
            let data = await this.userService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/me')
    @GET()
    @before(
        [
        authMiddleware
    ])
    public async me(req: Request, res: Response) {
        try {
            let data = req.user;
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/login')
    @POST()
    public async login(req: Request, res: Response) {
        try {
            let data : IUserDto = req.body;
            let _login = await this.userService.login(data.email, data.password)
            res.status(200).send(_login);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    @before(
        [
        authMiddleware,

        check('email').notEmpty(),
        check('password').notEmpty(),
        check('first_name').notEmpty(),
        check('last_name').notEmpty(),
        check('role').notEmpty(),
        check('birthday').notEmpty(),
        
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: IUserDto = req.body;
            await this.userService.create(body);
            res.status(200).send();
        } catch (error) {
            this.handleException(error, res)
        }
    }

    @route('/:id')
    @PUT()
    @before([
        authMiddleware,
        check('email').notEmpty(),
        check('first_name').notEmpty(),
        check('last_name').notEmpty(),
        check('role').notEmpty(),
        check('birthday').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: IUserDto = req.body;
            await this.userService.update(id,data);
            
            return res.status(200).send();
        } catch (error) {   
            this.handleException(error,res)
        }
    }

    @route('/update_password/:id')
    @PUT()
    @before([
        authMiddleware,
        check('password').notEmpty(),
        validateFields
    ])
    public async updatePassword(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: IUserDto = req.body;
            await this.userService.updatePassword(id,data.password);
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
            await this.userService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}