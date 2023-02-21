//librerías
import { Request, Response } from "express";
import { CrearUsuarioInput } from "../esquema/usuario.esquema";
import { crearUsuario } from "../servicio/usuario.servicio";
import logger from "../util/logger";
import { omit } from "lodash";

/**
 * Exportar función asíncrona para controlar la creación de nuevos usuarios
 * @param req: recibe la Request y define el diccionario y el cuerpo de la Response
 * valores por defecto y para el cuerpo de la Request utiliza el body del esquema de usuario
 * @param res
 * @returns 
 */
export async function crearUsuarioHandler(
  req: Request<{}, {}, CrearUsuarioInput["body"]>,
  res: Response
) {
  /* cuando se intenta crear un usuario
    ->try: si NO esta creado devuelve como mensaje con el nuevo usuario,
    omitiendo la clave.
    ->catch: si esta creado devuelve un mensaje de error,
    409 (conflict) debido a que se estaría generando un duplicado de
    un mismo usuario */
  try {
    const usuario = await crearUsuario(req.body);
    return res.send(omit(usuario.toJSON, "clave"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}