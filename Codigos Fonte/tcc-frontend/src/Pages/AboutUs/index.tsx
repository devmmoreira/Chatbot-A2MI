import React from 'react'
import { useState } from "react"
import { RouteComponentProps } from 'react-router-dom'

import NavigationMenuBar from "../../Components/NavigationMenuBar"

import HomePageIAImage from '../../Assets/homepag-IA.jpg'

import AlvaroProfile from '../../Assets/Team/alvaro.jpg'
import AugustoProfile from '../../Assets/Team/augusto.jpg'
import IldefonsoProfile from '../../Assets/Team/will.jpg'
import MarcosProfile from '../../Assets/Team/marcos.jpg'

import { 
    AboutUsPage,
    ShowAboutUs,
    AboutUsCard
} from "./style" 

interface ProfileCardSelect{
    alvaro: boolean
    augusto: boolean
    will: boolean
    marcos: boolean
}

const Products: React.FC<RouteComponentProps> = ({ match }) => {

    const [profileCard, setProfileCard] = useState<ProfileCardSelect>({
        alvaro: false,
        augusto: false,
        will: false,
        marcos: false
    })

    const togleCard = (name: string) => {
        switch(name){
            case "alvaro":
                if(profileCard.alvaro) { 
                    setProfileCard({
                        alvaro: false,
                        augusto: false,
                        will: false,
                        marcos: false
                    })
                } else {
                    setProfileCard({
                        alvaro: true,
                        augusto: false,
                        will: false,
                        marcos: false
                    })
                }
                break
            case "augusto":
                if(profileCard.augusto) { 
                    setProfileCard({
                        alvaro: false,
                        augusto: false,
                        will: false,
                        marcos: false
                    })
                } else {
                    setProfileCard({
                        alvaro: false,
                        augusto: true,
                        will: false,
                        marcos: false
                    })
                }
                break
            case "will":
                if(profileCard.will) { 
                    setProfileCard({
                        alvaro: false,
                        augusto: false,
                        will: false,
                        marcos: false
                    })
                } else {
                    setProfileCard({
                        alvaro: false,
                        augusto: false,
                        will: true,
                        marcos: false
                    })
                }
                break
            case "marcos":
                if(profileCard.marcos) { 
                    setProfileCard({
                        alvaro: false,
                        augusto: false,
                        will: false,
                        marcos: false
                    })
                } else {
                    setProfileCard({
                        alvaro: false,
                        augusto: false,
                        will: false,
                        marcos: true
                    })
                }
                break
            default:
                setProfileCard({
                    alvaro: false,
                    augusto: false,
                    will: false,
                    marcos: false
                })
                break
        }

        setTimeout(() => {
            setProfileCard({
                alvaro: false,
                augusto: false,
                will: false,
                marcos: false
            })
        },5000)
    }

    return(
        <AboutUsPage>
            <img className="bg-image" src={ HomePageIAImage } alt="home-page"/>
            <NavigationMenuBar match={ match }/>
            <div className="team">
                <p className="title">Equipe</p>
                <ShowAboutUs>
                    <AboutUsCard 
                        img={ AlvaroProfile } 
                        isSelected={ profileCard.alvaro }
                        onClick={ () => togleCard("alvaro") }>
                        <div className="description">
                            <h1>Alvaro</h1>
                            <p>Eng. Cartógrafo, Mestrado em Geofísica, Pós-graduado em Docência do Ensino Superior MBA em Gestão de TI. 
                            Depois de mais de 9 anos trababalhando em Geofísica, veio a mudança para área de Ti.
                            Dev full-stack Angular/Java com Spring e atualmente na IBM no time de DevSecOps.</p>
                        </div>
                    </AboutUsCard>
                    <AboutUsCard 
                        img={ AugustoProfile } 
                        isSelected={ profileCard.augusto }
                        onClick={ () => togleCard("augusto") }>
                        <div className="description">
                            <h1>Augusto</h1>
                            <p>Formado em bacharelado em ciência da computação e técnico em Administração, 
                            especializado em layout de sites e Frontend e conhecedor das filosofias 
                            de um administrador e marketing</p>
                        </div>
                    </AboutUsCard>
                    <AboutUsCard 
                        img={ IldefonsoProfile } 
                        isSelected={ profileCard.will }
                        onClick={ () => togleCard("will") }>
                        <div className="description">
                            <h1>Ildefonso</h1>
                            <p>Técnico em informática, Manutenção em computadores e infraestrutura em redes. 
                            Formando em bacharelado no curso de Ciências da Computação. Fazendo parte de Testes de front-end para TGI. 
                            Pretendendo se epecializando na área de Segurança da Informação</p>
                        </div>
                    </AboutUsCard>
                    <AboutUsCard 
                        img={ MarcosProfile } 
                        isSelected={ profileCard.marcos }
                        onClick={ () => togleCard("marcos") }>
                        <div className="description">
                            <h1>Marcos</h1>
                            <p>Fascinado pela tecnologia me familiarizei com a área de programação, 
                            visando ser um facilitador de processos e na resolução de problemas. 
                            Buscando desenvolver soluções que ajudem a tornar uma página web mais dinâmicas e funcionais</p>
                        </div>
                    </AboutUsCard>
                </ShowAboutUs>
            </div>
        </AboutUsPage>
    )
}

export default Products