import React from 'react'
import { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom' 

import {
    Fab,
    Drawer,
    Modal,
    Backdrop,
    Fade
} from '@material-ui/core'

import { 
    ChildCare, 
    HighlightOffRounded, 
    ControlPoint,
    Language,
    Star
} from '@material-ui/icons'

import A2miChatBot from '../../Components/A2miChatBot'
import NavigationMenuBar from '../../Components/NavigationMenuBar'

import ContratarServicoImage from '../../Assets/contratar-serviço.jpg'
import OferecemosImage from '../../Assets/o-que-oferecemos.jpg'
import PropostaImage from '../../Assets/proposta.jpg'
import ImportanciaServicoImage from '../../Assets/importancia-serviço.jpg'

import { Instagram, Facebook, GitHub } from '@material-ui/icons'

import { 
    HomePageComponent,
    Footer,
    Intro,
    CloseChatbotButton,
    ExplainService,
    CardHomePage,
    MoreInfo,
    SocialMediaModal
} from './style'

interface SelectedCard{
    card1: boolean
    card2: boolean
    card3: boolean
    card4: boolean
}

const HomePage: React.FC<RouteComponentProps>= ({ match }) => {

    const [openChatWithChatbot, setOpenChatWithChatbot] = useState<boolean>(false)
    const [selectedCard, setSelectedCard] = useState<SelectedCard>({
        card1: false,
        card2: false,
        card3: false,
        card4: false
    })

    const [openFooterInfoModal, setOpenFooterInfoModal] = useState<boolean>(false)

    const selectCard = (type: string) => {
        switch(type){
            case "card1":
                setSelectedCard({
                    card1: true,
                    card2: false,
                    card3: false,
                    card4: false
                })
                break
            case "card2":
                setSelectedCard({
                    card1: false,
                    card2: true,
                    card3: false,
                    card4: false
                })
                break
            case "card3":
                setSelectedCard({
                    card1: false,
                    card2: false,
                    card3: true,
                    card4: false
                })
                break
            case "card4":
                setSelectedCard({
                    card1: false,
                    card2: false,
                    card3: false,
                    card4: true
                })
                break
            default:
                setSelectedCard({
                    card1: false,
                    card2: false,
                    card3: false,
                    card4: false
                })
                break
        }

        setTimeout(() => {
            setSelectedCard({
                card1: false,
                card2: false,
                card3: false,
                card4: false
            })
        }, 10000)
    }

    return(
        <HomePageComponent>
            <NavigationMenuBar match={ match }/>
            <Intro >
                <h1>Acompanhe a evolução da tecnologia e melhore o seu negócio</h1>
                <div/>
            </Intro>
            <ExplainService>
                <div className="cards-container">
                    <CardHomePage 
                        gridArea="card1" 
                        backgroundColor="#074c9177" 
                        backgroundImage={ OferecemosImage }
                        selected={ selectedCard.card1 }
                    >
                        <div className="content" onClick={ () => selectCard('card1')}>
                            <h1>O que Oferecemos</h1>
                            <p>Este serviço visa entregar mais produtividade e lucro para sua empresa de grande ou pequeno porte utilizando conceitos de 
                            Inteligência Artificial na criação de seu próprio chatbot  tendo um ganho mais palpável e com o curto prazo levando a automação à uma instância ainda mais potente.
                            Veja mais sobre na aba serviços</p>
                            <ControlPoint/>
                        </div>
                    </CardHomePage>
                    <CardHomePage 
                        gridArea="card2" 
                        backgroundColor="#7f0fac77" 
                        backgroundImage={ ContratarServicoImage }
                        selected={ selectedCard.card2 }
                    >
                        <div className="content" onClick={ () => selectCard('card2')}>
                            <h1>Deve contratar nosso serviço?</h1>
                            <p>A Inteligência Artificial (IA) vem demostrando uma gradativa evolução facilitando muito em atividades do dia a dia e em sistemas dentro de empresas 
                            diminuindo custos e demostrando que é uma tecnologia muito eficiente em qualquer segmento. O chatbot vai otimizar seu tempo em qualquer dúvida 
                            que as pessoas queiram tirar sobre seu comércio.</p>
                            <ControlPoint/>
                        </div>
                    </CardHomePage>
                    <CardHomePage 
                        gridArea="card3" 
                        backgroundColor="#7f0fac77" 
                        backgroundImage={ ImportanciaServicoImage }
                        selected={ selectedCard.card3 }
                    >
                        <div className="content" onClick={ () => selectCard('card3')}>
                            <h1>Importância deste serviço</h1>
                            <p>A Inteligência Artificial (IA) vem demostrando uma gradativa evolução facilitando muito em atividades do dia a dia e em sistemas dentro de empresas 
                            diminuindo custos e demostrando que é uma tecnologia muito eficiente em qualquer segmento. O chatbot vai otimizar seu tempo em qualquer dúvida 
                            que as pessoas queiram tirar sobre seu comércio.</p>
                            <ControlPoint/>
                        </div>
                    </CardHomePage>
                    <CardHomePage 
                        gridArea="card4" 
                        backgroundColor="#074c9177" 
                        backgroundImage={ PropostaImage }
                        selected={ selectedCard.card4 }
                    >
                        <div className="content" onClick={ () => selectCard('card4')}>
                            <h1>Nossa Proposta</h1>
                            <p>Além de ter como foco facilitar o dia a dia das pessoas usando a tecnologia, também queremos ajudar e melhorar nas finanças de seu negócio, 
                            com o tempo e o crescimento que a IA vai oferecer a sua empresa de pequeno porte, você já pode ir visando o futuro e ir pensando em melhorar outras áreas futuramente, 
                            assim crescendo cada vez mais e sendo um exemplo em seu segmento e mostrar que está à altura de qualquer outra grande empresa, e dependendo de seu 
                            negócio poderia ser um grande diferencial e servir de exemplos para outros negócios de seu seguimento</p>
                            <ControlPoint/>
                        </div>
                    </CardHomePage>
                </div>
            </ExplainService>
            <MoreInfo>
                <div>
                    <Language/>
                    <p>+ de 1000 <br /> clientes Globais</p>
                </div>
                <div>
                    <Star/>
                    <p>Bem Avaliado <br /> pelos clientes</p>
                </div>
                <div>
                    <ChildCare />
                    <p>+ de 10000 <br /> chats criados</p>
                </div>
            </MoreInfo>
            <Footer>
                <div>
                    <p onClick={ () => setOpenFooterInfoModal(true)}>Redes Sociais</p>
                    <p>Política de Privacidade</p>
                    <p>{ new Date().getFullYear() }</p>
                </div>
            </Footer>
            <Modal
                open={ openFooterInfoModal }
                onClose={ () => setOpenFooterInfoModal(false) }
                BackdropComponent={ Backdrop }
                closeAfterTransition
                style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Fade in={ openFooterInfoModal }>
                    <SocialMediaModal>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                            <Instagram/>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <Facebook/>
                        </a>
                        <a href="https://www.github.com/" target="_blank" rel="noreferrer">
                            <GitHub/>
                        </a>
                    </SocialMediaModal>
                </Fade>
            </Modal>
            <Fab className="chat-with-bot" onClick={ () => setOpenChatWithChatbot(true)}>
                <ChildCare />
            </Fab>
            <Drawer 
                anchor="right"
                open={ openChatWithChatbot } 
                onClose={ () => {
                    setOpenChatWithChatbot(false)
                    clearInterval()
                }}
            >
                <CloseChatbotButton onClick={ () => {
                    setOpenChatWithChatbot(false)
                    clearInterval()
                }}>
                    <HighlightOffRounded/>
                </CloseChatbotButton>
                <A2miChatBot />
            </Drawer>
        </HomePageComponent>
    )
}

export default HomePage