import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { Defect, Project, TestCase, TestPlan, TestScenario, User } from "./entities/models";
import { IDefectDto } from "./dtos/Defect";

export class DefectService extends BaseController {

    //lista de defectos
    async getAll(){
        try {
            const data = await Defect.findAll({
                include: [
                    {model: TestCase, as: 'testcase',
                        include: [
                            {model: TestScenario, as: 'testscenario',
                                include: [
                                    {model: TestPlan, as: 'testplan',
                                        include: [
                                            {model: Project, as: 'project'}
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {model: User, as: 'assigned'}
                ]
            });
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    //lista de hitos
    async getByTestCase(testcase_id: number){
        try {
            const data = await Defect.findAll({where: {test_case_id: testcase_id},
            include: [
                {model: TestCase, 
                    as: 'testcase'
                },
                {model: User, as: 'assigned'}
            ]});
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }


    //crear nuevo registro
    async create(data : IDefectDto){
        try {
            await Defect.create(data as any);
            return true;
        } catch (error:any) {
            throw new ApplicationException(error.message)
        }
    }


    //actualizar registro
    async update(id: number, data : IDefectDto){
        try {
            let row : any = await Defect.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }

            row.description = data.description;
            row.status = data.status;
            row.severity = data.severity;
            row.resolve_date = data.resolve_date;
            row.hours = data.hours;
            row.assigned_to = data.assigned_to;
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
            let row : any = await Defect.findByPk(id);
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