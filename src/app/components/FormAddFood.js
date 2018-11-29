import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Grid,Row,Col,HelpBlock,Button,FormGroup,FormControl,ControlLabel,Well} from 'react-bootstrap';
import {Toaster,Intent} from '@blueprintjs/core';
import {app} from '../../base';
//regla allow read, write: if request.auth != null;

export default class FormAddFood extends Component{
    constructor(props){
        super(props);
        this.state = {
            porcion:'',
            alimento:'',
            kcal:0,
            group:'',
            equivalente:'',
            image:'',
            file:null,
            uploadValue:0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    idImage(){
        const now = new Date();
        let timestamp = now.getFullYear().toString(); 
        timestamp += (now.getMonth() < 9 ? '0' : '') + now.getMonth().toString(); 
        timestamp += (now.getDate() < 10 ? '0' : '') + now.getDate().toString();
        timestamp += (now.getHours() < 10 ? '0' : '') + now.getHours().toString();
        timestamp += (now.getMinutes() < 10 ? '0' : '') + now.getMinutes().toString();
        timestamp += (now.getSeconds() < 10 ? '0' : '') + now.getSeconds().toString();
        timestamp += (now.getMilliseconds() < 10 ? '0' : '') + now.getMilliseconds().toString();
        return timestamp;
    }

    handleUpload(event){
        const file = event.target.files[0];
        if(file === undefined){
            console.log('no seleccionaste nada');
        }else{
            this.setState({file});
        }
        //console.log(id+''+image.name);
    }

    addFood(e){
        e.preventDefault();
        //console.log(this.state);
        //poner handleValidation
        //validar que si se este cargando una foto
        const id = this.idImage();
        const file = this.state.file;
        const filename = id+''+file.name;

        const storageRef = app.storage().ref(`/foods/${filename}`);
        const task = storageRef.put(file);
        
        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue:percentage
            });
        }, error => {
            console.log(error);
            this.toaster.show({intent:Intent.DANGER,message:"Error al subir la foto"})
        },() => {
            let esto = this;
            task.snapshot.ref.getDownloadURL().then(function(url){
                esto.setState({image:url})
                esto.addFetch();
            });
            
        })
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
                                <FormControl type="file" onChange={this.handleUpload}/>
                                <HelpBlock>Sube una imagen de la porcion equivalente</HelpBlock>
                            </FormGroup>
                            <progress value={this.state.uploadValue} max="100"></progress>
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