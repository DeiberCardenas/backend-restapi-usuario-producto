//librerías
import logger from "pino";

// definir una nueva instancia de pino
const log = logger({
  transport: {
    target: "pino-pretty", //utilizar pino pretty para el estilizado
    options: {
        colorize: true //agrega colores según el tipo de salida
      }
  },
});

//exportar
export default log;
