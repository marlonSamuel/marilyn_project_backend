import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { Integration, Project } from "./entities/models";
import { IntegrationDto as IIntegrationDto } from "./dtos/Integration";
import { IWorkflowJob } from "./dtos/IworkflowJob";
import { WorkFlowJobEntitie } from "./entities/WorkflowJobEntitie";

export class IntegrationService extends BaseController {
    //lista de hitos
    async getAll(){
        try {
            const data = await Integration.findAll();
            return data;
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
        
    }

    //crear nuevo registro
    async create(data : IIntegrationDto){
        try {
            const project : any = await Project.findOne({where: {repository_name: data.repositoryName}});
            if(!project){
                throw new ApplicationException("Nombre de proyecto no configurado")
            }
            data.projectId = project.id;
            await Integration.create(data as any);
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
    }

    //crear nuevo registro
    async createWorkFlowJob(data : IWorkflowJob, repositoryName: string){
        try {
            const project : any = await Project.findOne({where: {repository_name: repositoryName}});
            if(!project){
                throw new ApplicationException("Nombre de proyecto no configurado")
            }
            data.project_id = project.id;
            await WorkFlowJobEntitie.create(data as any);
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message);
        }
    }

}