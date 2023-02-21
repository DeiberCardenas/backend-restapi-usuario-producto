// librerías
import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verificarJwt } from "../util/jwt.util";
import { reEditarTokenAcceso } from "../servicio/sesion.servicio";

/**
 * Función asíncrona que se encarga de decodificar los tokens
 * de una sesión.
 * @param req
 * @param res
 * @param next
 * @returns
 */
const deserializarUsuario = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // obtener el token de acceso
    const tokenAcceso = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    ); // Con la función replace() se limpia el token de acceso

    // Obtener el token actualizado
    const tokenActualizado = get(req, "headers.x-refresh")?.toString();

    // Si el token de acceso NO existe, ósea es false devuelve next()
    if (!tokenAcceso) return next();

    // Inicializar decifrado y expirado a partir de verificar el token de acceso
    const { decifrado, expirado } = verificarJwt(tokenAcceso);

    // Si el contenido de decifrado existe hace que usuario sea igual a
    // decifrado en la plantilla actual de la función deserializarUsuario.
    if (decifrado) {
        res.locals.usuario = decifrado;
        return next();
    }

    /* Si al verificar el token, este, a expirado y se cuenta con
       un token actualizado valido, se edita el token de acceso y
       si al evaluar que el nuevo token es valido define un nuevo header.

       Luego se genera un resultado a partir de verificar el nuevo token
       de acceso y de manera se utiliza el usuario para guardar el contenido
       del decifrado del nuevo token de acceso
       */
    if (expirado && tokenActualizado) {
        const nuevoTokenAcceso = await reEditarTokenAcceso({
            tokenActualizado,
        }).toString();
        if (nuevoTokenAcceso) {
            res.setHeader("x-access-token", nuevoTokenAcceso);
        }
        const resultado = verificarJwt(nuevoTokenAcceso);
        res.locals.usuario = resultado.decifrado;
        return next();
    }
    // devuelve next()
    return next();
};

export default deserializarUsuario;
