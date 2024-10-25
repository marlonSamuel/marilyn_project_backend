import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { TestPlan, User } from "./entities/models";
import { ITestPlanDto } from "./dtos/TestPlan";

export class TestPlanService extends BaseController {

    //lista de hitos
    async getAll(user_id = 0){
        try {
            let data = await TestPlan.findAll({
                include: [{
                    model: User,
                    as: 'createdBy'
                },{
                    model: User,
                    as: 'assignedTo'
                }],
            });
            if(user_id){
                data = data.filter((x: any) => x.assigned_to === user_id)
            }
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    
    //listado de plan de prueba por id
    async getById(id:number){
        try {
            const data = await TestPlan.findByPk(id);
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    //lista de hitos por projecto
    async getByProject(project_id: number){
        let data = [];
        try {
            if(project_id){
                data = await TestPlan.findAll({where: {project_id: project_id},include: [{
                    model: User,
                    as: 'createdBy'
                },{
                    model: User,
                    as: 'assignedTo'
                }],});
            }else{
                data = await TestPlan.findAll({include: [{
                    model: User,
                    as: 'createdBy'
                },{
                    model: User,
                    as: 'assignedTo'
                }],});
            }
           
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    //crear nuevo registro
    async create(data : ITestPlanDto){
        try {
            await TestPlan.create(data as any);
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }


    //actualizar registro
    async update(id: number, data : ITestPlanDto){
        try {
            let row : any = await TestPlan.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }

            row.assigned_to = data.assigned_to;
            row.name = data.name;
            row.description = data.description;
            row.status = data.status;
            row.acceptance_criteria = data.acceptance_criteria;
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
            let row : any = await TestPlan.findByPk(id);
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