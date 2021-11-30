import React from 'react'
import { useState } from 'react'
import { Link, match, useHistory } from 'react-router-dom'

import { 
    Modal, 
    Fade, 
    Backdrop,
    Drawer 
} from '@material-ui/core'

import { 
    Person,
    HighlightOffRounded,
    DehazeRounded
} from '@material-ui/icons'

import Userlogin from '../UserLoginForm'
import CreateUser from '../CreateUserForm'

import { 
    MenuBar,
    MobileMenuBarButtons,
    LoginModalContent
} from './style'

import WhiteLogo from '../../Assets/logotipo-branco.png'

interface toggleAccess {
    login: boolean,
    create: boolean
}

interface toggleOptionsProps{
    type: 'login' | 'create',
    value: boolean
}

interface MenuBarActionsRoute{
    match: match<{}>
}

const NavigationMenuBar: React.FC<MenuBarActionsRoute> = ({ match }) => {

    const history = useHistory()

    const [open, setOpen] = useState<boolean>(false);
    const [openMobileNavigationMenu, setOpenMobileNavigationMenu] = useState<boolean>(false)
    const [startTransition, setStartTransition] = useState<boolean>(false)

    const handleOpen = () => {
        setTogleAccess({
            login: true,
            create: false
        })
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const [togleAccess, setTogleAccess] = useState<toggleAccess>({
        login: true,
        create: false
    })

    const togleOptions = ({ type, value }: toggleOptionsProps ) => {

        setStartTransition(true)

        setTimeout(() => {
            setTogleAccess(prev => ({
                login: (type === 'login')? value : (prev.login)? false : true,
                create: (type === 'create')? value : (prev.create)? false : true
            }))

            setStartTransition(false)
        },210)
    }

    return (
        <MenuBar>
            <div className="menu-mobile">
                <button onClick={ () => setOpenMobileNavigationMenu(true)}>
                    <DehazeRounded />
                </button>
                <Drawer 
                    anchor="left"
                    open={ openMobileNavigationMenu } 
                    onClose={ () => {
                        setOpenMobileNavigationMenu(false)
                    }}
                >
                    <MobileMenuBarButtons>
                        <header>
                            <img src={ WhiteLogo } alt="a2mi" />
                            <button onClick={ () => {
                                setOpenMobileNavigationMenu(false)
                            }}>
                                <HighlightOffRounded/>
                            </button>
                        </header>
                        <hr/>
                        <Link to="/" className={(match.path === "/") ? "selected" : ""}>Home</Link><hr/>
                        <Link to="/about-us" className={(match.path === "/about-us") ? "selected" : ""}>Sobre nós</Link><hr/>
                        <Link to="/services" className={(match.path === "/services") ? "selected" : ""}>Serviços</Link><hr/>
                        <Link to="/contacts" className={(match.path === "/contacts") ? "selected" : ""}>Contato</Link><hr/>
                    </MobileMenuBarButtons>
                </Drawer>
            </div>
            <div className="logo">
                <img src={ WhiteLogo } alt="a2mi" onClick={ () => history.push("/") }/>
                <div className="pipeline"></div>
            </div>
            <div className="actions">
                <Link to="/about-us">Sobre nós</Link>
                <Link to="/services">Serviços</Link>
                <Link to="/contacts">Contato</Link>
            </div>
            <div className="user-area">
                <Person onClick={ handleOpen }/>
                <Modal 
                    open={ open } 
                    onClose={ handleClose }
                    closeAfterTransition
                    BackdropComponent={ Backdrop }
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={ open }>
                        <LoginModalContent togle={ startTransition }>
                            <div className="modal-content">
                                <header>
                                    <img src={ WhiteLogo } alt="a2mi" />               
                                    <button onClick={ handleClose }>
                                        <HighlightOffRounded/>
                                    </button>
                                </header>
                                <section>
                                    {
                                        (togleAccess.login) ? 
                                        <Userlogin closeModal={ handleClose } togleOption={ togleOptions }/>
                                        :
                                        <CreateUser togleOption={ togleOptions }/>
                                    }
                                </section>
                            </div>
                        </LoginModalContent>
                    </Fade>
                </Modal>               
            </div>
        </MenuBar>
    )
}

export default NavigationMenuBar