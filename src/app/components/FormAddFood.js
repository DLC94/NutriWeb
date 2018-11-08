import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Grid,Row,Col,HelpBlock,Button,FormGroup,FormControl,ControlLabel,Well} from 'react-bootstrap';
import {Toaster,Intent} from '@blueprintjs/core';

export default class FormAddFood extends Component{
    constructor(props){
        super(props);
        this.state = {
            porcion:'',
            alimento:'',
            kcal:0,
            group:'',
            equivalente:''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    addFood(e){
        e.preventDefault();
        //console.log(this.state);
        //poner handleValidation
        this.addFetch();
    }

    addFetch(){
        fetch('/api/food',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Accept":'application/json',
                "Content-Type":'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.toaster.show({intent:Intent.SUCCESS,message:"Alimento creado"});
            this.setState({
                porcion:'',alimento:'',kcal:0,group:'',equivalente:''
            })
        })
        .catch(err => console.error(err));
    }

    handleChange(e){
        const {name,value} = e.target;
        //console.log([name]);
        this.setState({
            [name]:value
        });
    }

    render(){
        let token = localStorage.getItem('token');
        if(!token){
            return <Redirect to='/login' />
        }
        return (
            <Grid>
                <Toaster ref={(e)=>{this.toaster = e}} />
                <Well>
                    <form onSubmit={(event)=>this.addFood(event)} ref={(form)=>this.foodForm = form}>
                        <Row>
                            <Col xs={12} sm={12} md={2} lg={2}>
                                <FormGroup>
                                    <ControlLabel>Porcion</ControlLabel>
                                    <FormControl type="text" placeholder="Porcion" value={this.state.porcion} name="porcion" onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={10} lg={10}>
                                <FormGroup>
                                    <ControlLabel>Alimento</ControlLabel>
                                    <FormControl type="text" placeholder="Alimento" value={this.state.alimento} name="alimento" onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={2} lg={2}>
                                <FormGroup>
                                    <ControlLabel>Kcal</ControlLabel>
                                    <FormControl type="number" placeholder="kcal" value={this.state.kcal} name="kcal" onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={10} lg={10}>
                                <FormGroup>
                                    <ControlLabel>Grupo</ControlLabel>
                                    <FormControl type="text" placeholder="Grupo" value={this.state.group} name="group" onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}><FormGroup>
                                <ControlLabel>Equivalente a</ControlLabel>
                                <FormControl type="text" placeholder="Equivalente a" value={this.state.equivalente} name="equivalente" onChange={this.handleChange} />
                            </FormGroup></Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                            <FormGroup>
                                <ControlLabel>Porcion</ControlLabel>
                                <FormControl type="file" />
                                <HelpBlock>Sube una imagen de la porcion equivalente</HelpBlock>
                            </FormGroup>
                            <progress value={50} max="100"></progress>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} style={{marginTop:"10px",textAlign:"right"}}>
                                <Button bsStyle="success" type="submit">Agregar Alimento</Button>
                            </Col>
                        </Row>
                    </form>
                </Well>
            </Grid>
        )
    }
}