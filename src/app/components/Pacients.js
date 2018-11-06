import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Grid,Row,Col,FormGroup,FormControl,Button,PageHeader,ListGroup,ListGroupItem,Glyphicon} from 'react-bootstrap';
import {Toaster,Intent} from '@blueprintjs/core';

class Pacients extends Component{

    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            pacients:[],
            condicion:"",
            listsize:12,
            hideOptions:true
        }

        this.deletePacient = this.deletePacient.bind(this);
        this.listaPacientes = this.listaPacientes.bind(this);
        this.addPacient = this.addPacient.bind(this);
        this.inputSeachHandleChange = this.inputSeachHandleChange.bind(this);
        this.displayOptions = this.displayOptions.bind(this);
    }

    componentDidMount(){
        this.fetchPacients();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    inputSeachHandleChange(e){
        this.setState({condicion:e.target.value})
    }

    listaPacientes(){
        var rows = [];
        const pacients = this.state.pacients;
        var condicion = this.state.condicion.toLowerCase();

        var arreglo = pacients.map( (e) => {
            const nombreCompleto = e.name + " " + e.lastName;
            return {name:nombreCompleto,_id:e._id}
        });

        var result = arreglo.filter((p)=>{
            return p.name.toLowerCase().indexOf(condicion)>-1;
        });

        for(var j = 0; j < result.length; j++){
            rows.push(this.addPacient(result[j].name,result[j]._id));
        }

        return rows;
    }

    displayOptions(){
        console.log("Aqui voy a desplegar las opciones")
        this.setState({listsize:10,hideOptions:false});
    }

    addPacient(name,id){
        return(
            <ListGroupItem key={id} >
                <Row>
                    <Col xs={9} sm={10} md={10} lg={10}>
                        <strong><h5>{name}</h5></strong>
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={2}>
                        <Button href={"/pacients/"+id}><Glyphicon glyph="pencil"/></Button>
                        <Button onClick={()=>{this.deletePacient(id)}}><Glyphicon glyph="trash"/></Button>
                    </Col>
                </Row>
            </ListGroupItem>
        )
    }

    fetchPacients(){
        this._isMounted = true;

        fetch('/api/pacients')
            .then(res => res.json())
            .then(data => {
                if(this._isMounted){
                    console.log(data);
                    this.setState({pacients:data});
                }
            })
            .catch(err => console.log(err));
    }

    deletePacient(id){
        
        if(confirm('Seguro que quiere eliminar al paciente')){
            fetch(`/api/pacients/${id}`,{
                method:'DELETE',
                headers: {
                    "Accept":'application/json',
                    "Content-Type":'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.toaster.show({intent:Intent.SUCCESS,message:"Paciente Eliminado"});
                this.fetchPacients();
            })
            .catch(err => console.error(err))
        }
    }

    render(){
        let token = localStorage.getItem('token')
        if(!token){
            return <Redirect to='/login' />
        }
        return(
            <Grid>
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}> 
                        <PageHeader>
                            Pacientes
                        </PageHeader>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={10}>
                        <FormGroup controlId="searchInput">
                            <FormControl type="text" placeholder="Buscar Paciente..." onChange={this.inputSeachHandleChange}/>
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={2}>
                        <Button bsStyle="success" block href="/add-pacients">Agregar Paciente</Button>
                    </Col>
                </Row>
                <Row><br/></Row>
                <Row>
                    <ListGroup>
                        {this.listaPacientes()}
                    </ListGroup>
                </Row>
            </Grid>
        )
    }

}

export default Pacients;

/*<Row key={id} className="row-pacients-list">
            <Col xs={12} sm={12} md={this.state.listsize} lg={this.state.listsize} style={{padding:"0px",paddingLeft:"15px"}}>
                <ListGroupItem key={id} onClick={this.displayOptions} className="list-pacients">
                    <strong><h5>{name}</h5></strong>
                </ListGroupItem>
            </Col>
            <Col xs={12} sm={12} md={2} lg={2} hidden={this.state.hideOptions} style={{padding:"0px",paddingRight:"15px"}}>
                <div className="options-list edit-option">
                <Glyphicon glyph="pencil"/>
                </div>
                <div className="options-list delete-option">
                <Glyphicon glyph="trash"/>
                </div>
            </Col>
                </Row>*/