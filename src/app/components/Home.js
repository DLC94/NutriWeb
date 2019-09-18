import React, { Component } from 'react';
import {Grid,Row,Col,Image,Well,PageHeader,Tab,Nav,NavItem,Glyphicon,Button} from 'react-bootstrap';
import '../App.css'
//import QRCode from '../assets/qrimg.png';

const QRCode = 'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/qrimg.png?alt=media&token=725e820c-520d-4951-8af9-39fa9e80b337'

class Home extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            key:1
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(key){
        this.setState({key});
        console.log(key,this.state.key)
    }

    componentWillMount(){
        console.log("Me monte");
    }

    componentWillUnmount(){
        console.log("Me desmonte");
    }

    render(){
        return(
            <Grid>
                <Well>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <PageHeader>Como descargar si NutriApp.</PageHeader>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Tab.Container id="tabs-nutriapp" activeKey={this.state.key} onSelect={this.handleSelect}>
                                <Row className="clearfix">
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <Nav bsStyle="pills" justified>
                                            <NavItem disabled eventKey={1}>Habilita fuentes desconocidas <Glyphicon glyph="check"/></NavItem>
                                            <NavItem disabled eventKey={2}>Descarga e Instalar <Glyphicon glyph="download"/></NavItem>
                                        </Nav>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} style={{marginTop:"20px"}}>
                                        <Tab.Content animation>
                                            <Tab.Pane eventKey={1}>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                <p>
                                                    Antes de instalar la aplicacion, debemos habilitar la opcion <strong>Origenes Desconocidos</strong>.
                                                </p>
                                                <p>
                                                    Para lograrlo en tu telefono vamos a <strong>Ajustes</strong>.
                                                    Una vez dentro de ajustes seleccionamos <strong>Seguridad</strong>.
                                                    Finalmente habilitamos la opcion <strong>Origenes Desconocidos</strong>.
                                                </p>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                <Button onClick={()=>{this.handleSelect(2)}}>Siguiente</Button>
                                                </Col>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey={2}>
                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <p>Escanea el siguiente codigo QR para descargar la app.</p>
                                                    <p>O da clic <strong><a href="https://drive.google.com/file/d/1ovOmw1svBw9zqOcTWIpE1VXCNlP3fd_-/view?usp=sharing">Aqui</a></strong></p>
                                                    
                                                    <p>Una vez se haya realizado la descarga, dar clic en instalar.</p>
                                                    <p><strong>*NOTA: App solo disponible para Android 4.5 en adelante</strong></p>
                                                </Col>
                                                <Col xs={12} sm={12} md={6} lg={6}>
                                                    <Image className="img-center"
                                                        src={QRCode} responsive rounded
                                                    />
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                <Button onClick={()=>{this.handleSelect(1)}}>Atras</Button>
                                                </Col>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Col>
                    </Row>
                    
                </Well>
            </Grid>
            
        );
    }
}

export default Home;