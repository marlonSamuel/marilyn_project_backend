import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { INoteDto } from "./dtos/NoteDto";
import { Note } from "./entities/NoteEntitie";

export class NoteService extends BaseController {
    async getAll(){
        try {
            let data = Note.findAll({order: [['id', 'DESC']]});
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    async getByTask(task_id: number){
        try {
            let data = Note.findAll({where: {task_id: task_id},order: [['id', 'DESC']]});
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    async create(data : INoteDto){
        try {
            await Note.create(data as any);
            return true;
        } catch (error:any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }

    async update(id: number, data : INoteDto){
        try {
            console.log(data)
            let row : any = await Note.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }
            row.description = data.description;
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
            let row : any = await Note.findByPk(id);
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