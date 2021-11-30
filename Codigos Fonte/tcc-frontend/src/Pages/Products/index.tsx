import React from 'react'
import { useState, useEffect } from "react"
import { RouteComponentProps, useHistory } from 'react-router-dom'

import api from '../../Services/tcc_api'

import ProductsModel from '../../Models/ProductsModel'

import NavigationMenuBar from "../../Components/NavigationMenuBar"
import AlertInfo from '../../Components/AlertInfo'
import ProductCard from '../../Components/ProductCard'

import HomePageIAImage from '../../Assets/homepag-IA-2.jpg'

import { 
    ProductsPage,
    ShowProducts,
} from "./style" 

const Products: React.FC<RouteComponentProps> = ({ match, location }) => {

    const history = useHistory()

    const [error, setError] = useState<boolean>(false)
    const [products, setProducts] = useState<Array<ProductsModel>>([])

    useEffect(() => {
        api.get("/products")
            .then(response => {
                if(location.search){
                    let plan: string

                    switch (location.search) {
                        case "?type=plus":
                            plan = "Plus"
                            break
                        case "?type=basico":
                            plan = "Básico"
                            break
                        case "?type=enterprise":
                            plan = "Enterprise"
                            break
                        default:
                            break;
                    }

                    setProducts(response.data.map((info: ProductsModel) => ({
                        ...info,
                        price: Number(info.price).toFixed(2),
                        isSelected: (info.name === plan)? true : false
                    })))

                }else{
                    setProducts(response.data.map((info: ProductsModel) => ({
                        ...info,
                        price: Number(info.price).toFixed(2),
                        isSelected: false
                    })))
                }
            })
            .catch(err => {
                console.log(err)
                setError(true)
                setTimeout(() => {
                    history.push("/")
                },5000)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <ProductsPage>
            <img className="bg-image" src={ HomePageIAImage } alt="home-page"/>
            <NavigationMenuBar match={ match }/>
            <ShowProducts>
                {
                    products.map(product => (
                        <ProductCard 
                            id={ product.id } 
                            key={ product.id }
                            type="buy" 
                            image={ product.image }
                            description={ product.description }
                            name={ product.name }
                            price={ product.price }
                            isSelected={ product.isSelected }
                        />
                    ))
                }
            </ShowProducts>
            {
                error &&
                <AlertInfo 
                    title="Falha de conexão" 
                    message="Não foi possivel obter os protudos, tente novamente mais tarde"
                    isError={ true }
                />
            }
        </ProductsPage>
    )
}

export default Products