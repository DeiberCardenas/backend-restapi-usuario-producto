//librerías
import { FilterQuery, UpdateQuery } from "mongoose";
import ModeloSesion, { DocumentoSesion } from "../modelo/sesion.modelo";
import { llamarJwt, verificarJwt } from "../util/jwt.util";
import config from "config";
import { get } from "lodash";
import { buscarUsuario } from "./usuario.servicio";

/**
 * Exportar función asíncrona para crear sesiones
 * @param usuarioId : identificador unico del usuario
 * @param agenteUsuario : define el manejador de la sesión
 * @returns devuelve una nueva sesión en formato JSON
 */
export async function crearSesion(usuarioId: string, agenteUsuario: string) {
  const sesion = await ModeloSesion.create({
    usuario: usuarioId,
    agenteUsuario,
  });

  return sesion.toJSON();
}

/**
 *  Exportar función asíncrona para buscar sesiones
 * @param query : Filtra la query para que solo sea de tipo DocumentoSesion
 * @returns devuelve las sesiones segun la query que se realize
 */
export async function buscarSesiones(query: FilterQuery<DocumentoSesion>) {
  return ModeloSesion.find(query).lean(); // .lean() hace que la query sea mas rápida y consuma menos memoria
}

/**
 * Exportar función asíncrona para actualizar sesiones.
 * @param query : Filtra la query para que solo sea de tipo DocumentoSesion
 * @param actualizar : Define la query que se le va a realizar al DocumentoSesion
 * @returns devuelve la sesión actualizada.
 */
export async function actualizarSesion(
  query: FilterQuery<DocumentoSesion>,
  actualizar: UpdateQuery<DocumentoSesion>
) {
    return ModeloSesion.updateOne(query, actualizar);
}

/**
 * Exportar función asíncrona para editar el token de acceso
 * @param tokenActualizado: define el token que se va editar
 * @returns : false = si NO se puede obtener el contenido de decifrado del token o
 * NO se puede obtener el contenido de desifrado del documento sesion.
 * @returns : false = si NO se puede obtener el contenido de decifrado de la sesión o
 * NO se puede obtener el campo valido de la sesión.
 * @returns : tokenAcceso = devuelve un token de acceso a partir de los campos suministrados.
 */
export async function reEditarTokenAcceso({tokenActualizado}:{tokenActualizado: string}) {
    // variable 
    const {decifrado} = verificarJwt(tokenActualizado);
    if(!decifrado || !get(decifrado, 'sesion')) return false;

    const sesion = await ModeloSesion.findById(get(decifrado, "sesion"));
    if(!sesion || !sesion.valido) return false;

    const usuario = await buscarUsuario({_id: sesion.usuario});
    if(!usuario) return false;

    const tokenAcceso = llamarJwt( 
      // ...usuario : permite recibir un numero indefinido de campos.
        {...usuario, sesion: sesion.usuario }, 
        {expiresIn: config.get("accessTokenTtl")},);
    return tokenAcceso;

}
