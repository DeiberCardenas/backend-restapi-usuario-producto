//librerías
import { object, string } from "zod";

// Exporta el esquema para crear una sesión
export const crearEsquemaSesion = object({
  body: object({
    correo: string({
      required_error: "El correo es requerido",
    }),
    clave: string({
      required_error: "La contraseña es requerida",
    }),
  }),
});