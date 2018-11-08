import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Grid,Row,Col,FormGroup,FormControl,Button,PageHeader,ListGroup,ListGroupItem,Glyphicon} from 'react-bootstrap';
import {Toaster,Intent} from '@blueprintjs/core';

export default class FoodList extends Component{

    _isMounted = false;

    constructor(props){
        super(props);
        this.state={
            condition:"",
            foods:[]
        }
        this.listaFood = this.listaFood.bind(this);
        this.addFood = this.addFood.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteFood = this.deleteFood.bind(this);
    }

    componentDidMount(){
        this.fetchFoods();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    fetchFoods(){
        this._isMounted = true;
        fetch('/api/food')
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                console.log(data);
                this.setState({foods:data})
            }
        })
        .catch(err => console.error(err))
    }

    listaFood(){
        var rows = [];
        const foods = this.state.foods;
        var condition = this.state.condition.toLowerCase();

        var arreglo = foods.map( e => {
            const title = e.alimento + ' (' + e.porcion + ')'
            return {name:title,_id:e._id}
        });

        var result = arreglo.filter( p => {
            return p.name.toLowerCase().indexOf(condition)>-1;
        });

        for(var j=0;j<result.length;j++){
            rows.push(this.addFood(result[j].name,result[j]._id));
        }

        return rows;
    }

    addFood(food,id){
        return (
            <ListGroupItem key={id}>
                <Row>
                    <Col xs={9} sm={10} md={10} lg={10}>
                        <strong><h5>{food}</h5></strong>
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={2}>
                        <Button href={"/food/"+id}><Glyphicon glyph="pencil"/></Button>
                        <Button onClick={()=>{this.deleteFood(id)}}><Glyphicon glyph="trash"/></Button>
                    </Col>
                </Row>
            </ListGroupItem>
        )
    }

    deleteFood(id){
        console.log("Voy a borrar");
        if(confirm("Seguro que quieres eliminar alimento")){
            fetch(`/api/food/${id}`,{
                method:'DELETE',
                headers: {
                    "Accept":'application/json',
                    "Content-Type":'application/json'
                }
            })
            .then(res=>res.json())
            .then(data => {
                console.log(data);
                this.toaster.show({intent:Intent.SUCCESS,message:"Alimento Eliminado"});
                this.fetchFoods();
            })
            .catch(err=>console.error(err));
        }
    }

    handleChange(e){
        this.setState({condition:e.target.value});
    }

    render(){
        let token = localStorage.getItem('token');
        if(!token){
            return <Redirect to='/login' />
        }
        return(
            <Grid>
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <PageHeader>Alimentos</PageHeader>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={10}>
                        <FormGroup controlId="formControlsText">
                            <FormControl type="Text" placeholder="Buscar Alimento" onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={2}>
                        <Button bsStyle="success" block href="/add-food">Agregar Alimento</Button>
                    </Col>
                </Row>
                <Row><br/></Row>
                <Row>
                    <ListGroup>
                        {this.listaFood()}
                    </ListGroup>
                </Row>
            </Grid>
        )
    }
}