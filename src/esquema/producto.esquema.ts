import { string, number, TypeOf, object} from "zod";

const payload = {
    body: object({        
        titulo: string({
            required_error: "El titulo es requerido!"
        }),
        descripcion: string({
            required_error: "La descripcion es requerida!"
        }).min(120, "La descripción debe tener un minimo de 120 caracteres"),
        precio: number({
            required_error: "El precio es requerido!"
        }),
        image: string({
            required_error: "La imagen es requerida"
        }),
    })
}



export const esquemaProducto = object({...payload});


export type inputProducto = TypeOf<typeof esquemaProducto>;


