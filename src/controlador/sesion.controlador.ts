// librerías
import { Request, Response } from "express";
import config from "config";
import {
  actualizarSesion,
  buscarSesiones,
  crearSesion,
} from "../servicio/sesion.servicio";
import { validarClave } from "../servicio/usuario.servicio";
import { llamarJwt } from "../util/jwt.util";

/**
 * Exporta una función asíncrona que se encarga de generar los tokens necesarios para
 * autentificar la creación de una nueva sesión.
 * @param req Request -> Petición
 * @param res Response -> Respuesta
 * @returns devuelve el tokenAcceso y tokenActualizado
 */
export async function crearManejadorUsuarioSesion(req: Request, res: Response) {
  // Validar la clave del usuario
  const usuario = await validarClave(req.body);
  if (!usuario) {
    return res.status(401).send("El correo o la contraseña son incorrectos");
  }

  //Crear una sesión
  const sesion = await crearSesion(
    usuario._id,
    req.get("agente-usuario") || ""
  );
  //Crear token de acceso
  const tokenAcceso = llamarJwt(
    { ...usuario, sesion: sesion.usuario },
    { expiresIn: config.get("accessTokenTtl") }
  );
  //Crear token actulizado
  const tokenActualizado = llamarJwt(
    { ...usuario, sesion: sesion.usuario },
    { expiresIn: config.get("refreshTokenTtl") }
  );
  //Return token de acceso y actulizado
  return res.send({ tokenAcceso, tokenActualizado });
}
/**
 * Exporta una función asíncrona que se encarga de obtener las sesiones.
 * @param req
 * @param res
 * @returns devuelve las sesiones existentes de un usuario
 */
export async function obtenerManejadorUsuarioSesion(
  req: Request,
  res: Response
) {
  const usuarioId = res.locals.usuario._id;
  const sesiones = await buscarSesiones({ usuario: usuarioId, valido: true });
  return res.send(sesiones);
}

/**
 * Exporta una función asíncrona que se encarga de actualizar el valor de los tokens
 * actuales de una sesión (tokenAcceso y tokenActualizado) a nulos.
 * @param req
 * @param res
 * @returns devuelve los tokens de la sesión con valor nulo
 */
export async function borrarManejadorSesiones(req: Request, res: Response) {
  const sesionId = res.locals.usuario.sesion;
  await actualizarSesion({ _id: sesionId }, { valido: false });
  return res.send({ tokenAcceso: null, tokenActualizado: null });
}
