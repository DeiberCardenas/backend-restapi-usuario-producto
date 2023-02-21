//librerías
import express from "express";
import config from "config";
import conexion from "./util/conexion";
import logger from "./util/logger";
import rutas from "./rutas";
import deserializarUsuario from "./middleware/deserializar-usuario";

//puerto de la app
const port = config.get<number>('port');

//app de tipo express()
const app = express();

//middlewares
app.use(deserializarUsuario);
app.use(express.json())

app.listen(port,async () => {
    logger.info(`La app se encuentra en http://localhost:${port}`);

    await conexion(); // generar la conexión con la base de datos

    rutas(app); // llama las rutas del proyecto
});