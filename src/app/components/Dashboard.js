import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Grid,Row,Col,Image,Button,FormGroup,FormControl,ControlLabel,Well} from 'react-bootstrap';
import FieldGroup from './FieldGroup';
import {Toaster,Intent} from '@blueprintjs/core';

class Dashboard extends Component{

    _isMounted = false;

    constructor(props){
        super(props)
        this.state = {
            editable:true,
            checked:false,
            _id:'',
            cedProfessional:'',
            email:'',
            formation:'',
            lastName:'',
            name:'',
            grade:''
        }
        this.editeEnable = this.editeEnable.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnMount(){
        this._isMounted = false;
    }

    getNutriologist(){
        this._isMounted = true;
        let id = localStorage.getItem('idNutriologist');
        fetch(`/api/nutriologist/${id}`)
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                //console.log("datos traidos del get: ",data)
                this.setState({
                    _id:data._id,
                    cedProfessional:data.cedProfessional,
                    email:data.email,
                    formation:data.formation,
                    lastName:data.lastName,
                    name:data.name,
                    grade:data.grade
                })
            }
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        this.getNutriologist();
    }

    editeEnable(){
        var edit = this.state.editable===true?false:true;
        var check = this.state.checked===true?false:true;
        this.setState({
            editable:edit,
            checked:check
        });
    }

    handleValidation(){
        const {cedProfessional,email,formation,lastName,name,grade} = this.state;
        let error = false;
        if(cedProfessional === "" || formation === "" || lastName === "" || name === "" || grade === ""){
            error = true;
        }

        return error;
    }

    editFetch(){
        const id = this.state._id;
        fetch(`/api/nutriologist/${id}`,{
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
        .catch(err => console.log(err));
    }

    editProfile(event){
        event.preventDefault()
        if(this.handleValidation()){
            this.toaster.show({intent:Intent.DANGER,message:"Favor de llenar todos los campos"});
        }else{
            console.log(this.state);
            this.editFetch();
            this.setState({editable:true,checked:false});
        }
    }

    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }

    render(){
        let token = localStorage.getItem('token');
        if(!token){
            return <Redirect to='/login'/>
        }
        return(
            <Grid>
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <Well>
                    <Row>
                        <Col xs={12} md={6} sm={12} lg={4}>
                            <Image className="img-center" 
                            src={'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/photo_profile%2Fprofile-picture.png?alt=media&token=3a578951-8e59-4898-a7e6-46d905235241'} 
                            responsive rounded />
                        </Col>
                        <form onSubmit={(event)=>this.editProfile(event)}>
                        <Col xs={12} md={6} sm={12} lg={8}>
                            <FormGroup>
                                <Row>
                                <Col xs={12} sm={12} md={12} lg={6}>
                                    <FieldGroup
                                        label="Nombre"
                                        type="text"
                                        placeholder="Nombre"
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.handleChange}
                                        disabled={this.state.editable}
                                    />
                                    
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={6}>
                                    <FieldGroup
                                        label="Apellido"
                                        type="text"
                                        placeholder="Apellido"
                                        value={this.state.lastName}
                                        name="lastName"
                                        onChange={this.handleChange}
                                        disabled={this.state.editable}
                                    />
                                </Col>
                                </Row>
                                <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <FieldGroup
                                        label="Correo Electronico"
                                        type="text"
                                        placeholder="Correo Electronico"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleChange}
                                        disabled={true}
                                    />
                                </Col>
                                </Row>
                                <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <FieldGroup
                                        label="Formacion"
                                        type="text"
                                        placeholder="Formacion"
                                        value={this.state.formation}
                                        name="formation"
                                        onChange={this.handleChange}
                                        disabled={this.state.editable}
                                    />
                                </Col>
                                </Row>
                                <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <FieldGroup
                                        label="Cedula Profesional"
                                        type="text"
                                        placeholder="Cedula Profesional"
                                        value={this.state.cedProfessional}
                                        name="cedProfessional"
                                        onChange={this.handleChange}
                                        disabled={this.state.editable}
                                    />
                                </Col>
                                </Row>
                                <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <FieldGroup
                                        label="Grado"
                                        type="text"
                                        placeholder="Grado"
                                        value={this.state.grade}
                                        name="grade"
                                        onChange={this.handleChange}
                                        disabled={this.state.editable}
                                    />
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
                                    <Button type="submit" disabled={this.state.editable} bsStyle="success" block >Editar</Button>
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

export default Dashboard;