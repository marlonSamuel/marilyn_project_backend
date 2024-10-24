import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { TestCase, TestScenario } from "./entities/models";
import { ITestScenarioDto } from "./dtos/TestScenario";

export class TestScenarioService extends BaseController {

    //lista de escenarios de prueba
    async getAll(){
        try {
            const data = await TestScenario.findAll({
                include: [{
                    model: TestCase,
                    as: 'testcases'}
                ]
            });
            return data;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
        
    }

    //listado de escenarios de prueba por id
    async getById(id:number){
        try {
            const data = await TestScenario.findByPk(id);
            return data;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
        
    }
    

    //listado de escenarios de prueba
    async getByTestPlan(testplan_id:number){
        try {
            const data = await TestScenario.findAll({
                where: {testplan_id: testplan_id},
                include: [{
                    model: TestCase,
                    as: 'testcases'}
                ]
            });
            return data;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
        
    }


    //crear nuevo registro
    async create(data : ITestScenarioDto){
        try {
            await TestScenario.create(data as any);
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }


    //actualizar registro
    async update(id: number, data : ITestScenarioDto){
        try {
            let row : any = await TestScenario.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }

            row.name = data.name;
            row.description = data.description;
            row.status = data.status;
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
            let row : any = await TestScenario.findByPk(id);
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