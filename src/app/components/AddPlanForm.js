import React, {Component} from 'react';
import {Tabs,Tab,Grid,Row,Col,Button,Well,Modal,ControlLabel,FormGroup,FormControl,Label,OverlayTrigger,Tooltip,Glyphicon} from 'react-bootstrap';
import {Toaster, Intent} from '@blueprintjs/core';
import Select from 'react-select';
import FieldGroup from './FieldGroup';
import {Redirect} from 'react-router-dom';

/*const tags = [
    {value:1,label:"Alimento 1"},
    {value:2,label:"Alimento 2"},
    {value:3,label:"Alimento 3"},
    {value:4,label:"Alimento 4"},
    {value:5,label:"Alimento 5"},
    {value:6,label:"Alimento 6"},
    {value:7,label:"Alimento 7"}
];*/

const tooltip = (
    <Tooltip id="tooltip">
        <strong>Separe por comas (,) para agregar mas obstaculos y/o soluciones</strong>
    </Tooltip>
);

class AddPlanForm extends Component{
    
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            show:false,
            key:1,
            selectedOptions:null,selectButton:0,
            foodCount:3,foodMin:3,foodMax:5,FoodList:[[],[],[],[],[]],
            comidas:[],
            filaCount:1,metasMax:5,metasMin:1,
            metas:{"objetivos":[],"beneficios":[],"obstaculos":[],"solucion":[]},
            optionFood:[]
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSelectTab = this.handleSelectTab.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.addPlanAlimenticio = this.addPlanAlimenticio.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.agregarAlimentos = this.agregarAlimentos.bind(this);

        //foods fields
        this.addFood = this.addFood.bind(this);
        this.addOtherFood = this.addOtherFood.bind(this);
        this.removeFood = this.removeFood.bind(this);

        //metas y motivaciones fields
        this.addFila = this.addFila.bind(this);
        this.addOtherFila = this.addOtherFila.bind(this);
        this.removeFila = this.removeFila.bind(this);

        this.convertToTag = this.convertToTag.bind(this);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidMount(){
       this.fetchFoods()
    }

    fetchFoods(){
        this._isMounted = true;
        fetch('/api/food')
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                console.log(data);
                this.convertToTag(data);
            }
        })
        .catch(err => console.error(err))
    }

    convertToTag(data){
        const tags = data.map(e => {
            const name = e.alimento + ' (' + e.porcion + ')'
            return {value:e._id,label:name}
        })
        this.setState({optionFood:tags});
        console.log(this.state.optionFood);
    }

    agregarAlimentos(){
        var list = this.state.FoodList;
        var i = Number(this.state.selectButton);
        list[i] = this.state.selectedOptions;
        this.setState({FoodList:list});
    }

    handleClose(){
        this.setState({show:false})
    }

    handleSelectTab(key){
        this.setState({key});
    }

    handleSelectChange(selectedOptions){
        this.setState({selectedOptions});
    }

    handleShow(i){
        this.setState({show:true,selectButton:i,selectedOptions:null})
    }

    addPlanAlimenticio(event){
        event.preventDefault();
        const filas = this.state.FoodList;
        const fstart = document.getElementById("startDate").value;
        const fend = document.getElementById("endDate").value;

        const comidas = this.state.comidas;
        const totalComidas = this.state.foodCount;
        for(let m = 0; m < totalComidas; m++){
            comidas[m] = {
                comida: document.getElementById('Comida'+m.toString()).value,
                hora: document.getElementById('Hora'+m.toString()).value
            }
        }

        const metas = this.state.metas;
        const total = this.state.filaCount;
        for(let p = 0; p < total; p++){
            const obj = document.getElementById("Objetivos"+p.toString()).value;
            const ben = document.getElementById("Beneficios"+p.toString()).value;
            const obs = document.getElementById("Obstaculos"+p.toString()).value;
            const sol = document.getElementById("Solucion"+p.toString()).value;
            metas.objetivos[p] = obj;
            metas.beneficios[p] = ben;
            metas.obstaculos[p] = obs;
            metas.solucion[p] = sol;
        }

        console.log(comidas,fend,fstart,filas,metas)
    }

    render(){
        let token = localStorage.getItem('token');
        if(!token){
            return <Redirect to='/login' />
        }
        const {selectedOptions} = this.state;
        return(
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar alimentos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {<Select
                            id="selectFood"
                            value={selectedOptions}
                            onChange={this.handleSelectChange}
                            options={this.state.optionFood}
                            isMulti
                        />}
                        <Button bsStyle="success" onClick={this.agregarAlimentos} className="boton-addFood">
                            Agregar
                        </Button>
                    </Modal.Body>
                </Modal>
                <Grid>
                    <Toaster ref={(element)=>{this.toaster = element}}/>
                    <Well>
                        <form onSubmit={(event)=>{this.addPlanAlimenticio(event)}}>
                        <Tabs
                            activeKey={this.state.key}
                            onSelect={this.handleSelectTab}
                            id="controlled-tab-example"
                        >
                            <Tab eventKey={1} title="Numero de comidas"><br/>
                                <Grid>
                                    {this.foodInput()}
                                </Grid>
                            </Tab>
                            <Tab eventKey={2} title="Metas y objetivos"><br/>
                                <Grid>
                                    {this.filaInput()}
                                </Grid>
                            </Tab>
                            <Tab eventKey={3} title="Duracion plan"><br/>
                                <Grid>
                                    <Col xs={12} sm={11} md={4} lg={4}>
                                        <FormGroup>
                                            <ControlLabel>Fecha inicio</ControlLabel>
                                            <input type="date" className="datetime" id="startDate"></input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} sm={11} md={4} lg={4}>
                                        <FormGroup>
                                            <ControlLabel>Fecha final</ControlLabel>
                                            <input type="date" className="datetime" id="endDate"></input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} sm={11} md={2} lg={2}>
                                        <Button bsStyle="success" type="submit" block className="margin-22">Agregar Plan</Button>
                                    </Col>
                                </Grid>
                            </Tab>
                        </Tabs>
                        </form>
                    </Well>
                </Grid>
            </div>
        )
    }

    //agregar comidas input

    addFood(i){
        return(
            <div key={'key'+i} className="rowNumComidas">
                <Row key={i}>
                    <Col xs={12} sm={11} md={4} lg={4}>
                        <FormGroup>
                            <ControlLabel>Nombre de comida {(i+1).toString()}</ControlLabel>
                            <FormControl type="text" placeholder={"Nombre de comida " + i.toString()} id={"Comida"+i.toString()} />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={11} md={4} lg={4}>
                        <FormGroup>
                            <ControlLabel>Hora</ControlLabel>
                            <input type="time" className="datetime" id={"Hora"+i.toString()}></input>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={11} md={2} lg={2}>
                        <Button bsStyle="success" className="margin-22" onClick={()=>this.handleShow(i)}>Agregar Alimento</Button>
                    </Col>
                    {(i+1)===this.state.foodCount?
                        <Col xs={12} sm={12} md={2} lg={2} style={{marginTop:"20px"}}>
                            <Button bsStyle="success" onClick={this.addOtherFood} disabled={this.state.foodCount===this.state.foodMax?true:false}>+</Button>
                            <Button bsStyle="danger" onClick={this.removeFood} disabled={this.state.foodCount===this.state.foodMin?true:false}>-</Button>
                        </Col>:null
                    }
                </Row>
                <Row className="row-foodsList">
                    {this.listOfFoodsPerRow(Number(i))}
                </Row>
            </div>
        );
    }

    listOfFoodsPerRow(i){
        var rows = [];
        rows = this.state.FoodList[i].map((e,p) => {
            return <Label key={i+'pos'+p} className="listFood">{e.label}</Label>
        })
        return rows;
    }

    addOtherFood(){
        var count = this.state.foodCount;
        if(count < this.state.foodMax){
            this.setState({foodCount:count+1});
        }
    }

    removeFood(){
        var count = this.state.foodCount;
        var list = this.state.FoodList;
        list[count-1] = [];
        this.state.comidas.pop();
        var comidasF = this.state.comidas;
        if(count > this.state.foodMin){
            this.setState({foodCount:count-1,FoodList:list,comidas:comidasF})
        }
    }

    foodInput(){
        var rows = [];
        var count = this.state.foodCount;
        for(let i = 0; i < count; i++){
            rows.push(this.addFood(i))
        }
        return rows;
    }

    //METAS y MOTIVACIONES
    addFila(i){
        return(
            <Row key={i}>
                <Row>
            <Col xs={12} sm={11} md={10} lg={10}>
                <Col xs={12} sm={11} md={12} lg={12}><FormGroup>
                    <ControlLabel>Objetivos</ControlLabel>
                    <FormControl type="text" placeholder="Objetivos" id={"Objetivos"+i.toString()}/>
                </FormGroup></Col>
                <Col xs={12} sm={11} md={12} lg={12}><FormGroup>
                    <ControlLabel>Beneficios</ControlLabel>
                    <FormControl type="text" placeholder="Beneficios" id={"Beneficios"+i.toString()}/>
                </FormGroup></Col>
                <Col xs={12} sm={11} md={12} lg={12}><FormGroup>
                    <ControlLabel>Obstaculos 
                        <OverlayTrigger placement="right" overlay={tooltip}><Glyphicon style={{marginLeft:"10px"}} glyph="info-sign"/></OverlayTrigger>
                    </ControlLabel>
                    <FormControl type="text" placeholder="Obstaculos" id={"Obstaculos"+i.toString()} />
                </FormGroup></Col>
                <Col xs={12} sm={11} md={12} lg={12}><FormGroup>
                    <ControlLabel>Solucion 
                        <OverlayTrigger placement="right" overlay={tooltip}><Glyphicon style={{marginLeft:"10px"}} glyph="info-sign"/></OverlayTrigger>
                    </ControlLabel>
                    <FormControl type="text" placeholder="Solucion" id={"Solucion"+i.toString()}/>
                </FormGroup></Col>
                
            </Col>
            </Row>
            <hr className="hr-plan"/>
            <Row>
            {(i+1)===this.state.filaCount?
            <Col xs={12} sm={11} md={12} lg={12}>
                <Button bsStyle="success" onClick={this.addOtherFila} disabled={this.state.filaCount===this.state.metasMax?true:false}>Nuevo Objetivo</Button>
                <Button bsStyle="danger" onClick={this.removeFila} disabled={this.state.filaCount===this.state.metasMin?true:false}>Eliminar Objetivo</Button>
            </Col>:null}
            </Row>
            </Row>
        );
    }

    addOtherFila(){
        var count = this.state.filaCount;
        if(count < this.state.metasMax){
            this.setState({filaCount:count+1});
        }
    }

    removeFila(){
        var count = this.state.filaCount;
        var metas = this.state.metas;
        metas["beneficios"].pop();
        metas["objetivos"].pop();
        metas["obstaculos"].pop();
        metas["solucion"].pop();
        if(count > this.state.metasMin){
            this.setState({filaCount:count-1,metas:this.state.metas})
        }
    }

    filaInput(){
        var rows = [];
        var count = this.state.filaCount;
        for(let i = 0; i < count; i++){
            rows.push(this.addFila(i));
        }
        return rows;
    }
}

export default AddPlanForm;