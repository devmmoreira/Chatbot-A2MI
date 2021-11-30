import { Repository, EntityRepository } from "typeorm"
import { v4 as uuid } from "uuid"
import fs from 'fs'
import AppError from "../errors/AppError"

import Products from "../Models/Products"

interface ProductsRequest{
    id: string
    name: string
    image: string
    description: string
    price: number
}

@EntityRepository(Products)
export default class ProductsRepository extends Repository<Products>{
    async addNewProduct({ name, image, description, price }: Omit<ProductsRequest, "id">): Promise<Products>{

        const existProduct = await this.findOne({ name })

        if(!!existProduct){
            await fs.promises.unlink(image)
            throw new AppError("Já existe um produto cadastrado com esse nome", 400)
        }

        const bitmap = fs.readFileSync(image);
        const base64ImageConverted = Buffer.from(bitmap).toString('base64');

        const newProduct = this.create({
            id: uuid(),
            name,
            description,
            price,
            image: `data:image/jpeg;base64,${base64ImageConverted}`,
            created_at: new Date(),
            updated_at: new Date(),
        })

        await this.save(newProduct)

        await fs.promises.unlink(image)

        return newProduct
    }

    async updateProduct({ id, name, image, description, price }: ProductsRequest): Promise<Products>{

        const existProduct = await this.findOne({ id })

        console.log(image)

        if(!existProduct){
            if(image !== ""){ await fs.promises.unlink(image) }
            throw new AppError("Produto inexistente", 404)
        }

        let base64ImageConverted: string = ""
        
        if(image !== ""){
            const bitmap = fs.readFileSync(image);
            base64ImageConverted = Buffer.from(bitmap).toString('base64');
        }

        const updatedProduct: Products = {
            id,
            name: (name)? name : existProduct.name,
            description: (description)? description : existProduct.description,
            price: (price)? price : existProduct.price,
            image: (base64ImageConverted !== "")? `data:image/jpeg;base64,${base64ImageConverted}` : existProduct.image,
            created_at: existProduct.created_at,
            updated_at: new Date(),
        }

        await this.save(updatedProduct)

        if(image !== "") { await fs.promises.unlink(image)}

        return updatedProduct
    }
}