import React from 'react'
import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'

import { ProductsCard } from "./style"

interface ProductsCardProps{
    id: string
    type: "asigned" | "buy"
    image: string
    isSelected?: boolean
    name: string
    price: number
    description: string
}

const ProductCard: React.FC<ProductsCardProps> = ({ id, type, description, image, name, price, isSelected }) => {

    const history = useHistory()
    const [showInfo, setShowInfo] = useState<boolean>(false)

    const showProductInfo = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setShowInfo(prev => !prev)

        setTimeout(() => {
            setShowInfo(prev => !prev)
        }, 5000)
    }

    const enterContact = () => {
        history.push(`/contacts/${ id }`)
    }

    useEffect(() => {
        setShowInfo(isSelected || false)
    },[isSelected])

    return(
        <ProductsCard
            img={ image } 
            isSelected={ showInfo }
            onClick={ showProductInfo }
        >
            <div className="description">
                <h1>{ name }</h1>
                <p>{ description }</p>
                <h2>R${ price }</h2>
            </div>
            {
                type === "buy" &&
                <button onClick={ () => enterContact() }>Contato</button>
            }
        </ProductsCard>
    )
}

export default ProductCard