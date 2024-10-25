import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { IUserDto } from "./dtos/IUserDto";
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import { Integration, Project, WorkFlowJobEntitie } from "./entities/models";
import { sequelize } from "../common/mysql.persistence";
import { IProjectDto } from "./dtos/ProjectDto";
import moment from "moment";
import { ProjectTaskView } from "./entities/ProjectTaskView";
import { ProjectTestView } from "./entities/ProjectTestView";
import { getUserId } from "../common/context";

export class ProjectService extends BaseController {
    private userId: number | null;

    constructor() {
        super()
        this.userId = getUserId(); // Obtén el userId del contexto global
    }

    //obtener las metricas del proyecto, defectos y tareas
    async getMetrics(project_id: any){
        console.log("entro acá");
        if(isNaN(project_id)){
            project_id = null;
        }
        let data_task = await ProjectTaskView.findAll();
        let data_test = await ProjectTestView.findAll();

        if(project_id){
            data_task = data_task.filter((x:any)=>x.id===parseInt(project_id));
            data_test = data_test.filter((x:any)=>x.id===parseInt(project_id));
        }

        const qa_projects = (data_task.filter((x:any)=>x.enviroment==='q')).length;
        const dev_projects = (data_task.filter((x:any)=>x.enviroment==='d')).length;
        const prod_projects = (data_task.filter((x:any)=>x.enviroment==='p')).length;

        const pending_projects = (data_task.filter((x:any)=>x.status==='p')).length;
        const inprogress_projects = (data_task.filter((x:any)=>x.status==='i')).length;
        const completed_projects = (data_task.filter((x:any)=>x.status==='c')).length;

        return {
            tasks: data_task,
            tests: data_test,
            qa: qa_projects,
            dev: dev_projects,
            prod: prod_projects,
            pendings: pending_projects,
            inprogress: inprogress_projects,
            completed: completed_projects
        }
    }

    async getDasboardData(){
        try {
            const projects = await Project.findAll();

            const qa_projects = (projects.filter((x:any)=>x.enviroment==='q')).length;
            const dev_projects = (projects.filter((x:any)=>x.enviroment==='d')).length;
            const prod_projects = (projects.filter((x:any)=>x.enviroment==='p')).length;

            const pending_projects = (projects.filter((x:any)=>x.status==='p')).length;
            const inprogress_projects = (projects.filter((x:any)=>x.status==='i')).length;
            const completed_projects = (projects.filter((x:any)=>x.status==='c')).length;


        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }

    //listar todos los proyectos
    async getAll(){
        try {
            //let data = await UserEntitie.findAll({include: 'BarberEntitie'});
            const data = await Project.findAll();
            return data;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
        
    }

        
    //listado de plan de prueba por id
    async getById(id:number){
        try {
            const data = await Project.findByPk(id);
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    //obtener proyectos por ambientes
    async getByEnviroment(env: string){
        try {
            //let data = await UserEntitie.findAll({include: 'BarberEntitie'});
            const data = await Project.findAll({where: {enviroment: env},
                include: [{
                    model: Integration,
                    as: 'integrations'
                },{
                    model: WorkFlowJobEntitie,
                    as: 'workflow_jobs'
                }]
            });
            return data;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
        
    }

    //crear un nuevo proyecto
    async create(data : IProjectDto){
        try {
            await Project.create(data as any);
        
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }

    //actualizar proyecto
    async update(id: number, data : IProjectDto){
        try {
            let row : any = await Project.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }
            console.log(data)
            row.name = data.name;
            row.description = data.description;
            row.start_date = moment(data.start_date);
            row.end_date = moment(data.end_date);
            row.status = data.status;
            row.enviroment = data.enviroment;
            row.repository_name = data.repository_name;
            row.url_repository = data.url_repository;
            await row.save();
            return {
                valid: true
            };
        } catch (error:any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }

    //eliminar proyecto
    async delete(id: number){
        try {
            let row : any = await Project.findByPk(id);
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