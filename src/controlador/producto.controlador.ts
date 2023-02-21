import { Request, Response } from "express";

import { inputProducto } from "../esquema/producto.esquema";
import {
  crearProducto,
  buscarProducto,
  buscarActualizarProducto,
  borrarProducto,
} from "../servicio/producto.servicio";

export async function crearManejadorProducto(
  req: Request<{}, {}, inputProducto["body"]>,
  res: Response
) {
  const usuarioID = res.locals.usuario._id;
  const body = req.body;
  const producto = await crearProducto({ ...body, usuario: usuarioID });

  return res.send(producto);
}

export async function listarManejadorProducto(req: Request, res: Response) {
  const proID = req.params._id;
  //const productoID = res.locals.producto._id;
  const producto = await buscarProducto({ proID });

  if (!producto) {
    return res.sendStatus(404);
  }

  return res.send(producto);
}

export async function actualizarManejadorProducto(req: Request, res: Response) {
  const usuarioID = res.locals.usuario._id;
  const productoID = req.params._id;
  const actulizar = req.body;
  const producto = await buscarProducto({ productoID });

  if (!producto) {
    return res.sendStatus(404);
  }

  if (producto.usuario != usuarioID) {
    return res
      .status(403)
      .send(`NO ES LO MISMO ${producto.usuario} QUE ESTO ${usuarioID}`);
  }

  const productoActualizado = await buscarActualizarProducto(
    { productoID },
    actulizar,
    { new: true }
  );

  return res.send(productoActualizado);
}

export async function borrarManejadorProducto(req: Request, res: Response) {
  const usuarioID = res.locals.usuario._id;
  const productoID = req.params._id;
  const producto = await buscarProducto({ productoID });

  if (!producto) {
    return res.sendStatus(404);
  }

  if (producto.usuario != usuarioID) {
    return res
      .status(403)
      .send(`NO ES LO MISMO ${producto.usuario} QUE ESTO ${usuarioID}`);
  }

  await borrarProducto({ productoID });

  return res.sendStatus(200);
}
