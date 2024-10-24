import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { Milestone } from "./entities/models";
import { IMilestoneDto } from "./dtos/MilestoneDto";

export class MilestoneService extends BaseController {

    //lista de hitos
    async getAll(){
        try {
            const data = await Milestone.findAll();
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    //lista de hitos por projecto
    async getByProject(project_id: number){
        try {
            const data = await Milestone.findAll({where: {project_id: project_id}});
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    //lista de hitos por projecto
    async getById(id: number){
        try {
            const data = await Milestone.findByPk(id);
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    //crear nuevo registro
    async create(data : IMilestoneDto){
        try {
            await Milestone.create(data as any);
        
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }


    //actualizar registro
    async update(id: number, data : IMilestoneDto){
        try {
            let row : any = await Milestone.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }

            row.name = data.name;
            row.description = data.description;
            row.start_date = data.start_date;
            row.end_date = data.end_date;
            row.status = data.status;
            await row.save();
            return {
                valid: true
            };
        } catch (error:any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }


    //eliminar registro
    async delete(id: number){
        try {
            let row : any = await Milestone.findByPk(id);
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