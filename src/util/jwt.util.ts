// librerías
import jwt from "jsonwebtoken";
import config from "config";

// crear llaves
const llavePrivada = config.get<string>("privateKey");
const llavePublica = config.get<string>("publicKey");

/**
 * Exportar función que se encarga de crear un nuevo Json Web Token (JWT)
 * a partir de:
 * @param objeto : define un objeto
 * @param opciones : define las opciones para crear un JWT
 * @returns devuelve un JWT creado a partir de los parámetros, encriptado con el
 * algoritmo RS256.
 */
export function llamarJwt(objeto: Object, opciones?: jwt.SignOptions | undefined) {
    return jwt.sign(objeto, llavePrivada, {
        ...(opciones && opciones), algorithm: "RS256",
    });
}

/**
 * Exportar función que permite verificar tokens
 * @param token : token a evaluar
 * @returns devuelve un objeto a partir de validar el token con la llave publica
 */
export function verificarJwt(token: string) {
    try {
        const decifrado = jwt.verify(token, llavePublica);
        return {
            valido: true,
            expirado: false,
            decifrado,
        };
    } catch (error: any) {
        return {
            valido: false,
            expirado: error.message === "Ha expirado el JSON Web Token",
            decifrado: null,
        };
    }
}
