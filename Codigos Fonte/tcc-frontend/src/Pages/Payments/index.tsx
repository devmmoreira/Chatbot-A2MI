import React from 'react'
import { useEffect, useState } from 'react'

import api from '../../Services/tcc_api'

import {
    Payments,
    PaymentsCard,
    PaymentsCardMobile,
    PaymentsCardMobileField
} from './style'

interface PaymentsRequest{
    id: string
    title: string
    value: string
    status: "open" | "payed" | "latePayment" | "overdue"
    dueDate: Date
    type_id: string
    user_id:  string
    created_at: Date
    updated_at: Date
}

const PaymentsPage: React.FC = () => {

    const [userData] = useState(JSON.parse(localStorage.getItem("userData") || ""))
    const [allPayemnts, setAllPayemnts] = useState<Array<PaymentsRequest>>([])

    useEffect(() => {
        if(userData?.user.id){
            api.get(`/payment/${userData.user.id}`, {
                headers: {
                    Authorization: userData.token
                }
            })
                .then(response => {
                    console.log(response)
                    setAllPayemnts(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else{
            alert("Invalid ID Token")
        }
    },[userData.user.id, userData.token])

    return(
        <>
            {
                allPayemnts.length <= 0 ?
                <h1>Você não possui pagamentos pendentes</h1>
                :
                <Payments>
                    {
                        allPayemnts.map(payment => 
                            <PaymentsCard key={ payment.id } status={ payment.status }>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        <th>Vencimento</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{ payment.title }</td>
                                        <td>R$ { Number(payment.value).toFixed(2) }</td>
                                        <td>{ new Date(payment.dueDate).toLocaleDateString() }</td>
                                        <td>{ payment.status }</td>
                                    </tr>
                                </tbody>
                            </PaymentsCard>
                        )
                    }
                    {
                        allPayemnts.map(payment => (
                            <PaymentsCardMobile status={ payment.status } key={ payment.id }>
                                <div className="row">
                                    <PaymentsCardMobileField>
                                        <label>Valor</label>
                                        <p>R$ { Number(payment.value).toFixed(2) }</p>
                                    </PaymentsCardMobileField>
                                    <PaymentsCardMobileField>
                                        <label>Vencimento</label>
                                        <p>{ new Date(payment.dueDate).toLocaleDateString() }</p>
                                    </PaymentsCardMobileField>
                                    <PaymentsCardMobileField>
                                        <label>Status</label>
                                        <p>{ payment.status }</p>
                                    </PaymentsCardMobileField>
                                </div>
                                <div className="row">
                                    <PaymentsCardMobileField isFull={ true }>
                                        <label>Nome</label>
                                        <p>{ payment.title }</p>
                                    </PaymentsCardMobileField>
                                </div>
                            </PaymentsCardMobile>
                        ))
                    }
                </Payments>
            }
        </>
    )
}

export default PaymentsPage