// librerías
import { Request, Response, NextFunction } from "express";

// función que verifica la existencia el usuario
const requerirUsuario = (req: Request, res: Response, next: NextFunction) => {
    const usuario = res.locals.usuario;
    // si el usuario no existe genera un error
    if(!usuario) return res.sendStatus(403);
    // devuelve next()
    return next();
}
// exportar
export default requerirUsuario;