//librerías
import mongoose from "mongoose";

import { DocumentoUsuario } from "./usuario.modelo"

//const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);



//exportar interface para crear documento de tipo sesión.
export interface DocumentoProducto extends mongoose.Document {
    usuario: DocumentoUsuario['_id'];
    titulo: string;
    descripcion: string;
    precio: number;
    image: string;
    createdAt: Date;
    updateAt: Date;
}

//Esquema para sesión
const esquemaProducto = new mongoose.Schema(
    {
        //productoId: { type: mongoose.Schema.Types.ObjectId, require: true, unique: true, default: () => `productoId_${nanoid}` },
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
        titulo: {type: String, require: true},
        descripcion: {type: String, require: true},
        precio: {type: Number, require: true},
        image: {type: String, require: true},
    },
    {
        timestamps: true,
    }
);

//crear el modelo de la sesión a partir de un objeto mongoose.Schema y un objeto mongoose.Model
const ModeloProducto = mongoose.model<DocumentoProducto>("Producto", esquemaProducto);

//exportar
export default ModeloProducto;