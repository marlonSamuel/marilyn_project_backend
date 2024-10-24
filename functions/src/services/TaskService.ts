import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { Milestone, Project, Task, User } from "./entities/models";
import { ITaskDto } from "./dtos/TaskDto";
import moment from "moment";

export class TaskService extends BaseController {

    //lista de hitos
    async getAll(user_id: any, project_id:any){
        try {
            let data = await Task.findAll({where: {parent_id: null},
                include: [{
                    model: User,
                    as: 'assignedTo'
                },
                {
                    model: Milestone,
                    as: 'milestone',
                    include: [
                        {
                            model: Project,
                            as: 'project'
                        }
                    ]
                }],
            });

            if(user_id && user_id !== "undefined"){
                console.log(user_id)
                data = data.filter((x:any) =>x.assignedTo.id === parseInt(user_id))
            }

            if(project_id && project_id !== "undefined"){
                console.log(project_id)
                data = data.filter((x:any) =>x.milestone.project_id === parseInt(project_id))
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }

    //lista de hitos
    async getByMilestone(milestone_id: number, user_id: any, project_id:any){
        try {
            let data = await Task.findAll({where: {milestone_id: milestone_id, parent_id: null},
                include: [{
                    model: User,
                    as: 'assignedTo'
                },
                {
                    model: Milestone,
                    as: 'milestone',
                    include: [
                        {
                            model: Project,
                            as: 'project'
                        }
                    ]
                }],
            });

            if(user_id && user_id !== "undefined"){
                console.log(user_id)
                data = data.filter((x:any) =>x.assignedTo.id === parseInt(user_id))
            }

            if(project_id && project_id !== "undefined"){
                console.log(project_id)
                data = data.filter((x:any) =>x.milestone.project_id === parseInt(project_id))
            }

            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    //lista de hitos
    async getByParent(parent_id: number, user_id: any, project_id:any){
        try {
            let data = await Task.findAll({where: {parent_id: parent_id},
                include: [{
                    model: User,
                    as: 'assignedTo'
                },
                {
                    model: Milestone,
                    as: 'milestone',
                    include: [
                        {
                            model: Project,
                            as: 'project'
                        }
                    ]
                }],
            });

            if(user_id && user_id !== "undefined"){
                console.log(user_id)
                data = data.filter((x:any) =>x.assignedTo.id === parseInt(user_id))
            }

            if(project_id && project_id !== "undefined"){
                console.log(project_id)
                data = data.filter((x:any) =>x.milestone.project_id === parseInt(project_id))
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }


    //crear nuevo registro
    async create(data : ITaskDto){
        try {
            if(!data.hours) data.hours = data.estimated_hours;
            console.log(data)
            await Task.create(data as any);
            return true;
        } catch (error:any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }


    //actualizar registro
    async update(id: number, data : ITaskDto){
        try {
            let row : any = await Task.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }

            row.assigned_to = data.assigned_to;
            row.name = data.name;
            row.description = data.description;
            row.start_date = moment(data.start_date);
            row.end_date = moment(data.end_date);
            row.status = data.status;
            row.hours = data.hours;
            row.estimated_hours = data.estimated_hours;
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
            let row : any = await Task.findByPk(id);
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