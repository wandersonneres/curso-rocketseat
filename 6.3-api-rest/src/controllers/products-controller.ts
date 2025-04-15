import { Request, Response } from "express"
import { AppError } from "../utils/app-error"
import { z } from "zod"
class ProductsController{
    /**
     * index - get para lista varios registros
     * show - get para exibir um registro especifico
     * create - post para criar um registro
     * update - put para atualizar um registro
     * remove - delete para deletar um registro
     */

    index(request: Request, response: Response){
        const {page, limit} = request.query
        response.send(`Pagina ${page} de ${limit} `)
    }

    create(request: Request, response: Response){

        const bodySchema = z.object({
            name: z.string({ required_error: "Nome do produto é obrigatório!" })
                .trim()
                .min(6, { message : "Digite no minimo 6 digitos"}),
            price: z.number({ required_error: "Preço do produto é obrigatório!" })
                .positive({ message : "Preço precisa ser positivo"})
        })

        const {name, price} = bodySchema.parse(request.body)


        /*
        if (!name){
            throw new AppError("Nome do produto é obrigatório!")
        }
        if (!price){
            throw new AppError("Preço do produto é obrigatório!")
        }
        */
        //throw new Error("Erro de Exemplo")
        //throw new AppError("Erro ao tentar criar um produto")

        response.status(201).json({name, price, user_id: request.user_id})
    }
}

export { ProductsController }