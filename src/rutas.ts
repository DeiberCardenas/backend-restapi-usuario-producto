//librerías
import { Express } from "express";
import validar from "./middleware/validar-recursos";
import { crearEsquemaUsuario } from "./esquema/usuario.esquema";
import { crearEsquemaSesion } from "./esquema/sesion.esquema";
import requerirUsuario from "./middleware/requerir-usuario";
import { crearUsuarioHandler } from "./controlador/usuario.controlador";
import {
  crearManejadorUsuarioSesion,
  obtenerManejadorUsuarioSesion,
  borrarManejadorSesiones,
} from "./controlador/sesion.controlador";
import { esquemaProducto } from "./esquema/producto.esquema";
import {
  actualizarManejadorProducto,
  borrarManejadorProducto,
  crearManejadorProducto,
  listarManejadorProducto,
} from "./controlador/producto.controlador";

//crear enrutamiento de tipo Express para crear usuarios
function routes(app: Express) {
  /* utiliza el método POST para crear un nuevo usuario:
    ->primero: define la ruta a la que debe apuntar la aplicación
    en este caso '/api/usuarios'
    ->segundo: valida que los campos del documento usuario a
    crearse cumplan con los requisitos establecidos
    ->tercero: el controlador se encarga de revisar que no se
    generen duplicados usuarios. */
  app.post("/api/usuarios", validar(crearEsquemaUsuario), crearUsuarioHandler);

  //crear sesiones
  /* utiliza el método POST para crear una nueva sesión:
    ->primero: define la ruta a la que debe apuntar la aplicación
    en este caso '/api/sesiones'
    ->segundo: valida que los campos del documento sesion a
    crearse cumplan con los requisitos establecidos
    ->tercero: el controlador se encarga de generar los tokens
    necesarios para crear una nueva sesión. */
  app.post(
    "/api/sesiones",
    validar(crearEsquemaSesion),
    crearManejadorUsuarioSesion
  );

  //obtener sesiones
  /* utiliza el método GET para obtener las sesiones de un usuario:
    ->primero: define la ruta a la que debe apuntar la aplicación
    en este caso '/api/sesiones'
    ->segundo: valida la existencia del usuario al cual estan
    vinculadas las sesiones
    ->tercero: el controlador se encarga obtener las sesiones
    correspondientes al usuario. */
  app.get("/api/sesiones", requerirUsuario, obtenerManejadorUsuarioSesion);

  //borrar sesiones
  /* utiliza el método DELETE para borrar una sesión:
    ->primero: define la ruta a la que debe apuntar la aplicación
    en este caso '/api/sesiones'
    ->segundo: valida la existencia del usuario al cual estan
    vinculadas las sesiones
    ->tercero: el controlador se encarga definir los valores de los tokens
    a nulos. */
  app.delete("/api/sesiones", requerirUsuario, borrarManejadorSesiones);

  app.post(
    "/api/productos",
    [requerirUsuario, validar(esquemaProducto)],
    crearManejadorProducto
  );

  app.get(
    "/api/productos",
    listarManejadorProducto
  );

  app.put(
    "/api/productos",
    [requerirUsuario, validar(esquemaProducto)],
    actualizarManejadorProducto
  );

  app.delete(
    "/api/productos",
    [requerirUsuario, validar(esquemaProducto)],
    borrarManejadorProducto
  );
}

//exportar
export default routes;
