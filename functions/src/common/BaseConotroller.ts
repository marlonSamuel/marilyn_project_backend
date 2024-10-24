import { Response } from 'express';
import { ApplicationException } from "./application.exception";

export abstract class BaseController {
    handleException(err: any, res: Response) {
        if (err instanceof ApplicationException) {
            res.status(err.statusCode);
            res.send({ok: false,message:err.message});
        } else {
            console.log("error en base controller",err.message);
            res.status(500).send({ok: false,message:'Error inesperado'});
            //throw new Error(err);
        }
    }
}