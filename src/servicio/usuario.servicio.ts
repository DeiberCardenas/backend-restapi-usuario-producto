//librerías
import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash"
import ModeloUsuario, { DocumentoUsuario } from "../modelo/usuario.modelo";

/**
 * Exportar función asíncrona para crear un nuevo usuario
 * @param input : filtra la entrada de datos para solo recibir de tipo documento,
 * omite campos que no son necesarios para crear un nuevo usuario.
 * @returns crea un documento a partir del modelo de usuario y una clave
 */
export async function crearUsuario(
  input: DocumentDefinition<
    //omite los siguientes campos para poder crear un nuevo usuario
    Omit<DocumentoUsuario, "fechaCreado" | "fechaActualizado" | "validarClave">
  >
) {
  /* ->try: crea un nuevo documento usuario
    ->catch: si ocurre algún error genera un mensaje por consola. */
  try {
    const usuario = await ModeloUsuario.create(input);
    return omit(usuario.toJSON(), 'clave')
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Exportar función asíncrona para validar clave de un usuario
 * @param correo : define el correo al cual esta asosiada la clave
 * @param clave : define la clave a validar
 * @returns devuelve un objeto a partir de un usuario y su clave.
 */
export async function validarClave({ correo, clave }: { correo: string, clave: string }) {
  const usuario = await ModeloUsuario.findOne({ correo });
  if (!usuario) return false;
  const esValido = await usuario.validarClave(clave);
  if (!esValido) return false;
  return omit(usuario.toJSON(), 'clave')
}
/**
 * Exportar función asíncrona para buscar un usuario
 * @param query : se encarga de filtrar que solo se reciban query para DocumentoUsuario
 * @returns devuelve los usuarios a partir de la query realizada
 */
export async function buscarUsuario(query: FilterQuery<DocumentoUsuario>) {
  return ModeloUsuario.findOne(query).lean();
}
