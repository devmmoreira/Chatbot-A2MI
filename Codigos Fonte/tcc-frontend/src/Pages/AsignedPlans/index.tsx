import React from 'react'
import { useEffect, useState } from 'react'

import api from '../../Services/tcc_api'

import ProductsModel from '../../Models/ProductsModel'

import ProductCard from '../../Components/ProductCard'

import { AsignedPlansPage } from './style'

interface AuthUser{
    user: {
        id: string
        username: string
    },
    token: string
}

const AsignedPlans: React.FC = () => {

    const [asignedServices, setAsignedServices] = useState<Array<ProductsModel>>([])
    const [userData] = useState<AuthUser>(JSON.parse(localStorage.getItem("userData") || ""))

    useEffect(() => {
        api.get(`/products/userplans/${userData.user.id}`, {
            headers: {
                Authorization: userData.token
            }
        })
        .then(response => {
            setAsignedServices(response.data.map((info: ProductsModel) => ({
                ...info,
                price: Number(info.price).toFixed(2),
                isSelected: false
            })))
        })
        .catch(err => {
            console.log(err)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <AsignedPlansPage containProducts={ (asignedServices.length <= 0)? false : true }>
            {
                asignedServices.length <= 0 ?
                <h1>Você não tem produtos assinados</h1>
                :
                asignedServices.map(product => (
                    <ProductCard 
                        id={ product.id } 
                        key={ product.id }
                        type="asigned" 
                        image={ product.image }
                        description={ product.description }
                        name={ product.name }
                        price={ product.price }
                        isSelected={ product.isSelected }
                    />
                ))
            }
        </AsignedPlansPage>
    )
}

export default AsignedPlans