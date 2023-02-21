//librerías
import { object, string, TypeOf } from "zod";

//crea el esquema para evaluar la peteción
export const crearEsquemaUsuario = object({
  body: object({
    nombre: string({
      required_error: "El nombre es obligatorio",
    }),
    clave: string({
      required_error: "La clave es obligatoria",
    }).min(8, "Clave demasiado corta, debe ser de 8 caracteres mínimo"),
    claveConfirmada: string({
      required_error: "La confirmación de la clave es obligatoria",
    }),
    correo: string({
      required_error: "El correo es obligatorio",
    }).email("No es una cuenta de correo valida"),
  }).refine((data) => data.clave === data.claveConfirmada, {
    message: "Clave incorrecta",
    path: ["claveConfirmada"],
  }),
});

//exportar
export type CrearUsuarioInput = Omit<
  TypeOf<typeof crearEsquemaUsuario>,
  "body.claveConfirmada"
>;