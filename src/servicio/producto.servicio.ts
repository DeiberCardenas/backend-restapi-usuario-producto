import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ModeloProducto, { DocumentoProducto } from "../modelo/producto.modelo";

export async function crearProducto(
  entrada: DocumentDefinition<Omit<DocumentoProducto, "createdAt" | "updateAt">>
) {
  const producto = await ModeloProducto.create(entrada);
  return producto.toJSON();
}

export async function buscarProducto(query: FilterQuery<DocumentoProducto>) {
  return ModeloProducto.findOne(query);
}

export async function buscarActualizarProducto(
  query: FilterQuery<DocumentoProducto>,
  update: UpdateQuery<DocumentoProducto>,
  options: QueryOptions
) {
  return ModeloProducto.findOneAndUpdate(query, update, options);
}

export async function borrarProducto(
  query: FilterQuery<DocumentoProducto>,
  options?: QueryOptions
) {
  return ModeloProducto.findOneAndDelete(query, options);
}
