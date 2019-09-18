import React, {Component} from 'react';
import {Navbar,Nav,NavItem,Glyphicon} from 'react-bootstrap';

class Header extends Component{
    
    render(){
        let token = localStorage.getItem('token')
       /* let url = window.location.pathname;
        console.log(url);
        if(url === '/'){
            console.log('raiz');
            return null;
        }else{*/
            return (
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">NutriWeb</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {token?
                            (<Nav pullRight>
                                <NavItem href="/dashboard">
                                    <Glyphicon glyph="home" /> Perfil
                                </NavItem>
                                <NavItem href="/pacients">
                                    <Glyphicon glyph="user" /> Pacientes
                                </NavItem>
                                <NavItem href="/foods">
                                    <Glyphicon glyph="cutlery" /> Alimentos
                                </NavItem>
                                
                                <NavItem href="/logout">
                                    <Glyphicon glyph="log-out"/> Salir
                                </NavItem>
                            </Nav>):
                            (<Nav pullRight>
                                <NavItem href="/login">Login</NavItem>
                                <NavItem href="/signin">Registro</NavItem>
                            </Nav>)
                        }
                        
                    </Navbar.Collapse>
                </Navbar>
            );
        //}
    }

}

export default Header;

/*
<NavItem href="/">
                                <Glyphicon glyph="apple" /> Recetas
                            </NavItem>
*/