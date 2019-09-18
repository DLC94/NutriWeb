import React, {Component} from 'react';
import {Grid,Row,Col,Button,FormGroup,FormControl,ControlLabel,Well,Radio,Table,Glyphicon} from 'react-bootstrap';
import {Toaster,Intent} from '@blueprintjs/core';
import moment from 'moment';

//falta agregar tabla para vincular folio con id, y campo folio en paciente

class FormAddPacient extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            _id:'',
            name: '',
            lastName: '.',
            weight: 0,
            height: 0,
            birth: moment().format('YYYY-MM-DD'),
            pacients:[],
            radioValue:'M',
            email:'',
            folio:''
        }
        //"2018-01-01"
        this.createPacient = this.createPacient.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deletePacient = this.deletePacient.bind(this);
        this.editPacient = this.editPacient.bind(this);

    }

    componentDidMount(){
        this.fetchPacients();
    }

    handleValidation(){
        const name = this.state.name;
        const lastName = this.state.lastName;
        const weight = this.state.weight;
        const height = this.state.height;
        const birth = this.state.birth;
        const email = this.state.email;
        const radioValue = this.state.radioValue;
        const folio = this.state.folio
        let error = false;
        if(folio === "" || name === "" || lastName === "" || weight === "" || height === "" || email === "" || radioValue === ""){
            error = true;
        }
        return error;
    }

    createPacient(event){
        /*
            BORRAR FUNCIONES QUE NO OCUPO COMO EDIT, DELETE, ETC
            VALIDAR QUE CORREO SOLO SEA GMAIL, PARA PODER USAR EL GOOGLE FIT
            EN EL MODELO DE PACIENT QUE CORREO SEA UNICO
        */
       event.preventDefault();
       /*if(this.handleValidation()){
            console.log("Hay un error");
            this.toaster.show({intent:Intent.DANGER,message:"Favor de llenar todos los campos"});
        }else{
            console.log(this.state.folio,this.state.name,this.state.lastName,this.state.email,this.state.height,this.state.weight,this.state.radioValue)
        }*/
        
        if(this.state._id){
            console.log(this.state);
            fetch(`/api/pacients/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers: {
                    "Accept":'application/json',
                    "Content-Type":'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.toaster.show({intent:Intent.SUCCESS,message:"Paciente editado"});
                this.setState({
                    name:'',lastName:'',weight:0,height:0,_id:''
                });
                this.fetchPacients();
            })
            .catch(err => console.log(err));
        }else{
            if(this.handleValidation()){
                console.log("Hay un error");
                this.toaster.show({intent:Intent.DANGER,message:"Favor de llenar todos los campos"});
            }else{
                //console.log(this.state);
                const idN = localStorage.getItem('idNutriologist');
                const body = {folio:this.state.folio,
                    name:this.state.name,lastName:this.state.lastName,
                    weight:this.state.weight,height:this.state.height,
                    birth:this.state.birth,gender:this.state.radioValue,
                    email:this.state.email,idN:idN}
                fetch('/api/pacients',{
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        "Accept":'application/json',
                        "Content-Type":'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if(data.message){
                            this.toaster.show({intent:Intent.DANGER,message:data.message});    
                        }else{
                            this.toaster.show({intent:Intent.SUCCESS,message:"Paciente creado"});
                            this.setState({
                                name:'',lastName:'',weight:0,height:0,email:'',folio:''
                            });
                            this.fetchPacients();
                        }
                    })
                    .catch(err => console.error(err))
            }
        }
    }

    fetchPacients(){
        fetch('/api/pacients')
            .then(res => res.json())
            .then(data => {
                this.setState({pacients:data});
                console.log(this.state.pacients)
            })
            .catch(err => console.error(err));
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

    editPacient(id){
        
        fetch(`/api/pacients/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log("Datos traidos del get: ",data);
            this.setState({
                _id:data._id,
                name:data.name,
                lastName:data.lastName,
                weight:data.weight,
                height:data.height
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
        return(
            <Grid>
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <Well>
                    <form onSubmit={(event)=>this.createPacient(event)} ref={(form)=>this.pacientForm = form}>
                        <Row>
                        	<Col xs={12} sm={12} md={12} lg={2}>
                        		<FormGroup>
                        			<ControlLabel>Folio</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Folio"
                                        value={this.state.folio}
                                        name="folio"
                                        onChange={this.handleChange}
                                    />
                        		</FormGroup>
                        	</Col>
                            <Col xs={12} sm={12} md={12} lg={4}>
                                <FormGroup>
                                    <ControlLabel>Nombre (s)</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Nombre (s)"
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4}>
                                <FormGroup>
                                    <ControlLabel>Apellido(s)</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Apellido(s)"
                                        value={this.state.lastName}
                                        name="lastName"
                                        onChange={this.handleChange}
                                        disabled={true}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={2}><Grid>
                                <FormGroup >
                                <Row><ControlLabel>Genero</ControlLabel></Row>
                                <Row><Radio disabled={true} name="radioGroup" inline onChange={()=>{this.setState({radioValue:'M'})}}>M</Radio>
                                <Radio disabled={true} name="radioGroup" inline onChange={()=>{this.setState({radioValue:'F'})}}>F</Radio></Row></FormGroup></Grid>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <FormGroup>
                                    <ControlLabel>Correo electronico</ControlLabel>
                                    <FormControl 
                                        type="email" 
                                        placeholder="Correo" 
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <FormGroup>
                                    <ControlLabel>Peso (Kg)</ControlLabel>
                                    <FormControl
                                        disabled={true}
                                        type="number"
                                        placeholder="Peso"
                                        value={this.state.weight}
                                        name="weight"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <FormGroup>
                                    <ControlLabel>Altura (Cm)</ControlLabel>
                                    <FormControl
                                        disabled={true}
                                        type="number"
                                        placeholder="Altura"
                                        value={this.state.height}
                                        name="height"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <FormGroup>
                                    <ControlLabel>Fecha de nacimiento</ControlLabel>
                                    <input type="date" 
                                        disabled={true}
                                        className="datetime" 
                                        id="input-birth" 
                                        value={this.state.birth} 
                                        name="birth"
                                        onChange={this.handleChange}></input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} style={{marginTop:"10px",textAlign:"right"}}>
                                <Button bsStyle="success" type="submit">{this.state._id?"Editar":"Agregar"}</Button>
                            </Col>
                        </Row>
                    </form>
                </Well>
            </Grid>
        )
    }
}

export default FormAddPacient;