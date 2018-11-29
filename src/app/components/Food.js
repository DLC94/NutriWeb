import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Grid,Row,Col,Image,Button,FormGroup,Well,HelpBlock} from 'react-bootstrap';
import {Toaster,Intent} from '@blueprintjs/core';
import FieldGroup from './FieldGroup';

class Food extends Component{

    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            editable:true,
            checked:false,
            _id:'',
            porcion:'',
            alimento:'',
            kcal:0,
            group:'',
            equivalente:'',
            image:''
        }

        this.editeEnable = this.editeEnable.bind(this);
        this.editFood = this.editFood.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidMount(){
        //console.log(this.props.foodID)
        this.getFood(this.props.foodID);
    }

    getFood(id){
        this._isMounted = true;
        fetch(`/api/food/${id}`)
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                
                this.setState({
                    _id:data._id,
                    porcion:data.porcion,
                    alimento:data.alimento,
                    kcal:data.kcal,
                    group:data.group,
                    equivalente:data.equivalente,
                    image:data.image
                })
            }
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

    editFood(e){
        e.preventDefault();
        //falta handleValidation
        this.editFetch();
        this.setState({editable:true,checked:false});
    }

    editFetch(){
        const id = this.state._id;
        fetch(`/api/food/${id}`,{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                "Accept":'application/json',
                "Content-Type":'application/json'
            }
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data)
            this.toaster.show({intent:Intent.SUCCESS,message:data.message});
        })
        .catch(err=>console.error(err));
    }

    editeEnable(){
        var editable = this.state.editable === true?false:true;
        var checked = this.state.checked === true?false:true;
        this.setState({
            editable,checked
        })
    }

    render(){
        let token = localStorage.getItem('token');
        if(!token){
            return <Redirect to='/login' />
        }
        return(
            <Grid>
                <Toaster ref={(el)=>{this.toaster = el}}/>
                <Well>
                    <Row>
                        <Col xs={12} md={6} sm={12} lg={4}>
                            <Image className="img-center" src={this.state.image} responsive rounded />
                            <HelpBlock>{this.state.porcion} de {this.state.alimento} es equivalente a {this.state.equivalente}</HelpBlock>
                        </Col>
                        <form onSubmit={(ev)=>this.editFood(ev)}>
                        <Col xs={12} md={6} sm={12} lg={8}>
                            <FormGroup>
                                <Row>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <FieldGroup disabled={this.state.editable} label="Porcion" type="text" placeholder="Porcion" value={this.state.porcion} name="porcion" onChange={this.handleChange} />
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <FieldGroup disabled={this.state.editable} label="Alimento" type="text" placeholder="Alimento" value={this.state.alimento} name="alimento" onChange={this.handleChange} />
                                </Col>
                                </Row>
                                <Row>
                                <Col xs={12} sm={12} md={3} lg={3}>
                                    <FieldGroup disabled={this.state.editable} label="Kcal" type="number" placeholder="Kcal" value={this.state.kcal} name="kcal" onChange={this.handleChange} />
                                </Col>
                                <Col xs={12} sm={12} md={9} lg={9}>
                                    <FieldGroup disabled={this.state.editable} label="Grupo" type="text" placeholder="Grupo" value={this.state.group} name="group" onChange={this.handleChange} />
                                </Col>
                                </Row>
                                <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <FieldGroup disabled={this.state.editable} label="Equivalente a" type="text" placeholder="Equivalente a" value={this.state.equivalente} name="equivalente" onChange={this.handleChange} />
                                </Col>
                                </Row>
                            </FormGroup>
                            <Row>
                                <Col xs={6} sm={6} md={4} lg={2} >
                                <label className="switch">
                                    <input type="checkbox" onChange={this.editeEnable} checked={this.state.checked}></input>
                                    <span className="slider round"></span>
                                </label>
                                </Col>
                                <Col xs={6} sm={6} md={4} lg={5} style={{marginTop:"10px"}}>
                                    <Button type="submit" disabled={this.state.editable} bsStyle="success" block>Editar</Button>
                                </Col>
                            </Row>   
                        </Col>
                        </form>
                    </Row>
                </Well>
            </Grid>
        )
    }
}

export default Food;