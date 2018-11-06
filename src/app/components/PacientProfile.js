import React, {Component} from 'react';
import {Grid,Row,Col,Button,Image,Well,FormGroup,ControlLabel} from 'react-bootstrap';
import {Toaster,Intent} from '@blueprintjs/core';
import FieldGroup from './FieldGroup';
import {Redirect} from 'react-router-dom'
import moment from 'moment';

class PacientProfile extends Component{

    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            _id:'',
            name: '',
            lastName: '',
            weight: 0,
            height: 0,
            birth: '2018-11-01'
        }

        this.handleChange = this.handleChange.bind(this);
        this.editPacient = this.editPacient.bind(this);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getPacient(id){
        this._isMounted = true;
        fetch(`/api/pacients/${id}`)
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                console.log("datos traidos del get: ",data)
                const date = moment(data.birth).add(1,'days').format('YYYY-MM-DD');
                //console.log(mom);
                this.setState({
                    _id:data._id,
                    name:data.name,
                    lastName:data.lastName,
                    weight:data.weight,
                    height:data.height,
                    birth:date
                })
            }
            
        })
        .catch(err => console.error(err));
    }

    componentDidMount(){
        this.getPacient(this.props.pacientID)
        console.log(moment().format('YYYY-MM-DD'));
    }

    handleChange(e){
        const {name,value} = e.target;
        //console.log([name]);
        this.setState({
            [name]:value
        });
    }

    handleValidation(){
        const name = this.state.name;
        const lastName = this.state.lastName;
        const weight = this.state.weight;
        const height = this.state.weight;
        const birth = this.state.birth;
        let error = false;
        if(name === "" || lastName === "" || weight === "" || height === "" || birth === ""){
            error = true;
        }
        console.log(error)
        return error;
    }

    editFetch(){
        const id = this.state._id;
        fetch(`/api/pacients/${id}`,{
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
            this.toaster.show({intent:Intent.SUCCESS,message:"Paciente actualizado"});
        })
        .catch(err=> console.error(err));
    }

    editPacient(event){
        event.preventDefault();
        if(this.handleValidation()){
            console.log("Hay error");
            this.toaster.show({intent:Intent.DANGER,message:"Favor de llenar todos los campos"});
        }else{
            console.log(this.state);
            this.editFetch()
        }
    }

    render(){
        let token = localStorage.getItem('token');
        if(!token){
            return <Redirect to='/login' />
        }
        return(
            <Grid>
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <Well>
                    <Row>
                        <Col xs={12} sm={12} md={5} lg={3} className="align-center">
                            <Image src={'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/photo_profile%2Fprofile-picture.png?alt=media&token=3a578951-8e59-4898-a7e6-46d905235241'} responsive thumbnail />
                        </Col>
                        <form onSubmit={(event)=>this.editPacient(event)}>
                        <Col xs={12} sm={12} md={7} lg={9}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <FieldGroup
                                    label="Nombre(s)"
                                    type="text"
                                    placeholder="Nombre (s)"
                                    value={this.state.name}
                                    name="name"
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <FieldGroup
                                    label="Apellido (s)"
                                    type="text"
                                    placeholder="Apellido (s)"
                                    value={this.state.lastName}
                                    name="lastName"
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <FieldGroup
                                    label="Peso (kg)"
                                    type="number"
                                    placeholder="Peso"
                                    value={this.state.weight}
                                    name="weight"
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <FieldGroup
                                    label="Altura (cm)"
                                    type="number"
                                    placeholder="Altura"
                                    value={this.state.height}
                                    name="height"
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <FormGroup>
                                    <ControlLabel>Fecha de nacimiento</ControlLabel>
                                    <input type="date" 
                                        className="datetime" 
                                        id="input-birth" 
                                        value={this.state.birth} 
                                        name="birth"
                                        onChange={this.handleChange}></input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} sm={6} md={4} lg={5} style={{marginTop:"10px"}}>
                                <Button bsStyle="success" block type="submit">Editar</Button>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={5} style={{marginTop:"10px"}}>
                                <Button bsStyle="success" block href={`pacients/${this.state._id}/add-plan`}>Agregar Plan</Button>
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

export default PacientProfile;