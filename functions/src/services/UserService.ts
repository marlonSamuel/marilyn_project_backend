import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { IUserDto } from "./dtos/IUserDto";
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import { User } from "./entities/models";
import { sequelize } from "../common/mysql.persistence";

export class UserService extends BaseController {

    async getAll(){
        try {
            //let data = await User.findAll({include: 'BarberEntitie'});
            const data = await User.findAll();
            return data;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
        
    }

    async login(email: string, pass: string){
        pass = SHA('sha256').update(pass as any).digest('base64');
        let user: any = await User.findOne({where: {password: pass, email: email}})
        if(!user){
            throw new ApplicationException("Credenciales invalidas")
        }
        let secret_key:string = process.env.jwt_secret || '';

        const _user = {
            id: user.id,
            email: user.email,
            names: user.first_name+' '+(user.second_name?user.second_name:''),
            last_names: user.last_name+' '+(user.second_last_name?user.second_last_name:''),
            role: user.role}
        
        const token = jwt.sign({
            user: _user
        }, secret_key, { expiresIn: '150h', algorithm: 'HS256' });
        
        return {user: _user, token}
    }

    async create(data : IUserDto){
        try {
            const exists_email = await User.findOne({where: {email: data.email}});
            if(exists_email){
                throw new ApplicationException("Ya existe este correo asociado a otra cuenta");
            }
            data.password = SHA('sha256').update(data.password as any).digest('base64');
            await User.create(data as any);
        
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }

    async update(id: number, data : IUserDto){
        try {
            let row : any = await User.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }
            const exists_email = await User.findOne({where: {email: data.email, 
                id: { [Op.not]: row.id }    
            }});

            if(exists_email){
                throw new ApplicationException("Ya existe este correo asociado a otra cuenta");
            }

            row.first_name = data.first_name;
            row.second_name = data.second_name;
            row.last_name = data.last_name;
            row.second_last_name = data.first_name;
            row.email = data.email;
            row.birthday = data.birthday;

            if(data.password) {
                row.password = SHA('sha256').update(data.password as any).digest('base64');
            }
            await row.save();
            return {
                valid: true
            };
        } catch (error:any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }

    async updatePassword(id: number, password: string){
        try {
            let row : any = await User.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }

            if(password) {
                row.password = SHA('sha256').update(password as any).digest('base64');
            }
            await row.save();
            return {
                valid: true
            };
        } catch (error:any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }

    async delete(id: number){
        try {
            let row : any = await User.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }
            await row.destroy();
            return {
                valid: true
            }
        } catch (error : any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }


}