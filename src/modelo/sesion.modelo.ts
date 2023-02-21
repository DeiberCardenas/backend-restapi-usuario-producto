//librerías
import mongoose from "mongoose";
import {DocumentoUsuario} from "./usuario.modelo"

//exportar interface para crear documento de tipo sesión.
export interface DocumentoSesion extends mongoose.Document {
  usuario: DocumentoUsuario['_id'];
  valido: boolean;
  agenteUsuario: string;
  fechaCreado: Date;
  fechaActualizado: Date;
}

//Esquema para sesión
const esquemaSesion = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    valido: { type: Boolean, default: true },
    agenteUsuario: {type: String},
  },
  {
    timestamps: true,
  }
);

//crear el modelo de la sesión a partir de un objeto mongoose.Schema y un objeto mongoose.Model
const ModeloSesion = mongoose.model<DocumentoSesion>("Sesion", esquemaSesion);

//exportar
export default ModeloSesion;