import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { TestCase } from "./entities/models";
import { ITestCaseDto } from "./dtos/TestCase";

export class TestCaseService extends BaseController {

    //lista de hitos
    async getAll(){
        try {
            const data = await TestCase.findAll();
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    //lista de casos de pruebas por scenariso de prueba
    async getByScenarie(scenario_id: number){
        try {
            const data = await TestCase.findAll({where: {scenario_id: scenario_id}});
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }


    //crear nuevo registro
    async create(data : ITestCaseDto){
        try {
            await TestCase.create(data as any);
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }


    //actualizar registro
    async update(id: number, data : ITestCaseDto){
        try {
            let row : any = await TestCase.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }

            row.name = data.name;
            row.description = data.description;
            row.status = data.status;
            row.expected_result = data.expected_result;
            row.actual_result = data.actual_result;
            row.test_data = data.test_data;
            await row.save();
            return {
                valid: true
            };
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }


    //eliminar registro
    async delete(id: number){
        try {
            let row : any = await TestCase.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }
            await row.destroy();
            return {
                valid: true
            }
        } catch (error : any) {
            throw new ApplicationException(error.message)
        }
    }


}