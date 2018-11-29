import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Grid, Row, Col, Well, ControlLabel, FormControl,ListGroup,ListGroupItem,Button,Glyphicon} from 'react-bootstrap';

import Chart from 'react-apexcharts';

const diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

class Expedients extends Component{
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            expedients: [],
            labData:[],
            options:{
                chart:{
                    id:"basic-bar"
                },
                xaxis:{
                    categories: ['Glucosa', 'Creatinina Serica', 'Urea', 'Trigliceridos', 'Colesterol', 'HDL', 'LDL', 'VLDL', 'Acido Urico','Hemoglobina Glucosidala']
                }
            },
            series:[
                {
                    name: "series-1",
                    data: [10,10,10,10,10,10,10,10,10,10]
                },
                {
                    name: "series-2",
                    data: [10,10,10,10,10,10,10,10,10,10]
                }
            ]
        }

        this.changeExp = this.changeExp.bind(this);
        this.listExpedients = this.listExpedients.bind(this);
    }

    componentDidMount(){
        console.log(this.props.pacientID);
        //this.setState({idPacient:this.props.pacientID});
        this.fetchExpedient(this.props.pacientID);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    fetchExpedient(id){
        this._isMounted = true;
        fetch(`/api/expedient/pacient/${id}`)
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                console.log(data)
                this.setState({expedients:data});
                this.convertToArray()
            }
        })
        .catch(err => console.error(err))
    }

    convertToArray(){
        var arreglo = this.state.expedients.map(e => {
            //['Glucosa', 'Creatinina Serica', 'Urea', 'Trigliceridos', 'Colesterol', 'HDL', 'LDL', 'VLDL', 'Acido Urico','Hemoglobina Glucosidala']
            return [e.glusoca,e.creatininaSerica,e.urea,e.trigliceridos,e.colesterolTotal,e.HDL,e.LDL,e.VLDL,e.acidoUrico,e.hemoglobinaGlucosidala]
        });
        console.log(arreglo);
        this.setState({labData:arreglo});
    }

    optionsSelect(){
        return this.state.expedients.map((e,i)=>{
            const date = new Date(e.date)
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const dayOfWeek = date.getDay();
            const minute = date.getMinutes();
            const hour = date.getHours();
            //value = {e._id}
            return <option key={e._id} value={i}>Expediente #{i+1}: {diasSemana[dayOfWeek]} {day} de {meses[month]} de {year} - {hour}:{minute}</option>
        })
    }

    changeExp(e){
        const index = e.target.value;
        const newSerie = []
        this.state.series.map((s)=>{
            let data = [];
            if(s.name === e.target.name){
                data = s.data.map((e,i)=>{
                    console.log(this.state.labData[index][i]);
                    return this.state.labData[index][i];
                })
            }else{
                data = s.data;
            }
            console.log(data)
            newSerie.push({data,name:s.name});
        })
        this.setState({series:newSerie})
    }

    listExpedients(){
        return this.state.expedients.map((e,i)=>{
            const date = new Date(e.date)
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const dayOfWeek = date.getDay();
            const minute = date.getMinutes();
            const hour = date.getHours();
            //value = {e._id}
            return <ListGroupItem key={e._id}>
                <Row>
                    <Col xs={9} sm={10} md={10} lg={10}>
                        <strong><h5>Expediente #{i+1}: {diasSemana[dayOfWeek]} {day} de {meses[month]} de {year} - {hour}:{minute}</h5></strong>
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={2}>
                        <Button onClick={()=>{this.deleteExpedient(e._id,i)}}><Glyphicon glyph="trash"/></Button>
                    </Col>
                </Row>
            </ListGroupItem>
        })
    }

    deleteExpedient(id,i){
        fetch(`/api/expedient/${id}`,{
            method:'DELETE',
            headers: {
                "Accept":'application/json',
                "Content-Type":'application/json'
            }
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data);
            const nuevoArreglo = this.state.expedients;
            const nuevoLabData = this.state.labData;
            nuevoArreglo.splice(i,1);
            nuevoLabData.splice(i,1);
            this.setState({expedients:nuevoArreglo,labData:nuevoLabData});
        })
        .catch(err => console.error(err))
    }

    render(){
        let token = localStorage.getItem('token')
        if(!token){
            return <Redirect to="/login"/>
        }
        return(
            <Grid>
                <Well>
                    <Row>
                        <Col xs={12} sm={12} md={5} lg={5}>
                            <Row>
                                <ControlLabel>Expediente</ControlLabel>
                                <FormControl componentClass="select" placeholder="select" name="series-1" 
                                    onChange={this.changeExp}>
                                    {this.optionsSelect()}
                                </FormControl>
                            </Row>
                            <Row>
                                <ControlLabel>Expediente</ControlLabel>
                                <FormControl componentClass="select" placeholder="select" name="series-2" onChange={this.changeExp}>
                                    {this.optionsSelect()}
                                </FormControl>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                            <ListGroup>
                            {this.listExpedients()}
                            </ListGroup>
                                
                            </Row>
                        </Col>
                        <Col xs={12} sm={12} md={7} lg={7}>
                            <div className="app">
                                <div className="row">
                                    <div className="mixed-chart">
                                        <Chart
                                            options={this.state.options}
                                            series={this.state.series}
                                            type="line"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Well>
            </Grid>
        )
    }
}

export default Expedients;