import React, {Component} from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import {Navbar,Nav,NavItem,Glyphicon,Row,Col} from 'react-bootstrap';

class Home extends Component{
    render(){
        return(
            <div>
                {/*<div className="navBar">
                    <AnchorLink href='#inicio'>Inicio</AnchorLink>
                    <AnchorLink  href='#conocenos'>Conocenos</AnchorLink>
                    <AnchorLink  href='#ofrecemos'>Que te ofrecemos</AnchorLink>
                </div>*/}
                <Navbar inverse collapseOnSelect className="navbar-home" staticTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" style={{color:'white'}}>NutriApp</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight >
                                <NavItem >
                                    <AnchorLink href='#inicio' className="linkHome">Inicio</AnchorLink>
                                </NavItem>
                                <NavItem >
                                    <AnchorLink  href='#conocenos' className="linkHome">Conocenos</AnchorLink>
                                </NavItem>
                                
                            </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div>
                    <section id='inicio' style={{backgroundColor:'#f9f9f9'}} className='fullScreenHeight'>
                        <div className="BGImg"></div>
                        <div className="bg-text">
                            <h1>NutriApp</h1>                            
                            <p>
                                Tu Applicacion para seguimiento dietetico.
                            </p>
                        </div>
                    </section>
                    <section id='conocenos' style={{backgroundColor:'#f5f5f5',padding:20}} className='fullScreenHeight centerElements'>
                        <div style={{flex:2}}>
                            <h3>Que es NutriApp</h3>
                            <p>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                            </p>
                            <div>
                                <img className="img-download" src="http://nutriapp.com.co/wp-content/uploads/2018/01/02images.png"/>
                                <img className="img-download" src="http://nutriapp.com.co/wp-content/uploads/2018/01/01images.png"/>
                            </div>
                        </div>
                        <div style={{flex:1}}>
                            <img className="img-cel" src="https://cdn130.picsart.com/253669595019212.png?r1024x1024"/>
                        </div>
                    </section>
                    {/*
                    <NavItem >
                                    <AnchorLink  href='#ofrecemos' className="linkHome">Que te ofrecemos</AnchorLink>
                                </NavItem><section id='ofrecemos' style={{backgroundColor:'yellow'}} className='fullScreenHeight centerElements'>
                        <h3>Que te ofrecemos</h3>
            </section>*/}
                </div>
            </div>
        )
    }
}

export default Home;