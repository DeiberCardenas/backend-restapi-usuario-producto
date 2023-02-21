//librerías
import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

/**
 * función asíncrona conexion()
 * Se encarga de establecer la conexión entre
 * la aplicación y la base de datos.
 */
async function conexion() {
    //hace llamado de la dbUri que se estableció en config/default.ts
    const dbUri = config.get<string>("dbUri"); 

    /*
    ->try: espera a que mongoose se establezca la conexión
    con la base de datos de mongoDB.
    ->catch: si se genera un error muestra un mensaje por consola
    y termina el proceso.
     */
    try {
        await mongoose.connect(dbUri);
        logger.info("La base de datos esta conectada");
    } catch (error) {
        logger.error("No se pudo conectar con la base de datos");
        process.exit(1);
    }
}

//exportar
export default conexion;
