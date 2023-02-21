//librerías
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

/*
zod permite validar los recursos de las peticiones que se le
realizan a la aplicación
 */
const validar =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };

//exportar
export default validar;
