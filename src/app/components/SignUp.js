import React,{Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core';
import {Redirect} from 'react-router-dom'
import '../App.css'

class SignUp extends Component{

    constructor(props){
        super(props)
        this.createNutriologist = this.createNutriologist.bind(this);

        this.state = {
            auth:null
        }
    }

    createNutriologist(event){
        /* 
            Falta verificar con regexp, que si sea un correo, y que contra tenga almenos 6 caracteres y un numero
        */
        event.preventDefault();
        const email = this.emailInput.value;
        const pass = this.passwordInput.value;
        const pass2 = this.password2Input.value;
        if(pass !==  pass2){
            this.toaster.show({intent:Intent.DANGER,message:"Contrasenas no coinciden"});
        }else{
            const body = {email:email,password:pass};
            fetch('/api/nutriologist/signup',{
                method: 'POST',
                body:JSON.stringify(body),
                headers:{
                    "Accept":'application/json',
                    "Content-Type":'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.token){
                    console.log("Hay token");
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('idNutriologist',data.id);
                    this.setState({auth:data.token})
                }else{
                    this.toaster.show({intent:Intent.DANGER,message:data.message});
                }
            })
            .catch(err => console.log(err));
        }
    }

    render(){
        let token = localStorage.getItem('token');
        if(token){
            return <Redirect to="/dashboard" />
        }
        return(
            <div className="formSignUp">
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <hr style={{marginTop:"10px",marginBottom:"10px"}}/>
                <form onSubmit={(e)=>{this.createNutriologist(e)}} ref={(form)=>{this.nutriologistForm = form}}>
                    <label className="bp3-label">
                        Email
                        <input style={{width:"100%"}} 
                            className="bp3-input" name="email" 
                            type="email" 
                            ref={(input)=>{this.emailInput=input}} 
                            placeholder="Email"/>
                    </label>
                    <label className="bp3-label">
                        Contrase&ntilde;a
                        <input style={{width:"100%"}} 
                        className="bp3-input" name="password" 
                        type="password" 
                        ref={(input)=>{this.passwordInput=input}} 
                        placeholder="Contrase&ntilde;a"/>
                    </label>
                    <label className="bp3-label">
                        Confirmacion de contrase&ntilde;a
                        <input style={{width:"100%"}} className="bp3-input" name="passwordC" type="password" ref={(input)=>{this.password2Input=input}} placeholder="Confirmacion"/>
                    </label>
                    <input style={{width:"100%"}} type="submit" className="bp3-button bp3-intent-success" value="Registrar"></input>
                </form>
            </div>
        )
    }
}

export default SignUp;