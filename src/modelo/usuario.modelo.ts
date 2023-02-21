//librerías
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

//exportar interface para crear documento de tipo usuario.
export interface DocumentoUsuario extends mongoose.Document {
  correo: string;
  nombre: string;
  clave: string;
  fechaCreado: Date;
  fechaActualizado: Date;
  validarClave(claveCandidata: string): Promise<boolean>; // función encargada determinar si la clave es válida.
}

//Esquema para usuarios
const esquemaUsuario = new mongoose.Schema(
  {
    correo: { type: String, require: true, unique: true },
    nombre: { type: String, require: true },
    clave: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

/*
.pre(): middleware para atomizar la lógica del negocio,
cuando se llama next() ejecuta la siguiente función .pre().
NOTA: si se llama a next() este no detiene el código, para que la
función se detenga se hace uso de return
"save": sí el documento(esquemaUsuario) actual NO EXISTE lo crea,
sí el documento EXISTE lo actualiza
*/
esquemaUsuario.pre("save", async function (next) {
  let usuario = this as unknown as DocumentoUsuario;
  if (!usuario.isModified("clave")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor")); //numero de veses que se va a encriptar la clave
  const hash = await bcrypt.hashSync(usuario.clave, salt); //encripta la clave
  usuario.clave = hash;
  return next();
});

/**
 * Valida la clave suministrada con la clave que se encuentra en la base de datos
 * @param claveCandidata clave a validar
 * @returns boolean=> true: sí la clave encriptada candidata es IGUAL a la clave encriptada del usuario
 * @returns boolean=> false: sí la clave encriptada candidata NO ES IGUAL a la clave encriptada del usuario
 */
esquemaUsuario.methods.validarClave = async function (
  claveCandidata: string
): Promise<boolean> {
  const usuario = this as DocumentoUsuario;
  return bcrypt.compare(claveCandidata, usuario.clave).catch((_error) => false);
};

//crear el modelo del usuario a partir de un objeto mongoose.Schema y un objeto mongoose.Model
const ModeloUsuario = mongoose.model<DocumentoUsuario>("Usuario", esquemaUsuario);

//exportar
export default ModeloUsuario;
