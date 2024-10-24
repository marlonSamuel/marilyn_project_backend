import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { Integration, Project } from "./entities/models";
import { IntegrationDto as IIntegrationDto } from "./dtos/Integration";

export class IntegrationService extends BaseController {
    //lista de hitos
    async getAll(){
        try {
            const data = await Integration.findAll();
            return data;
        } catch (error) {
            console.log(error)
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

}