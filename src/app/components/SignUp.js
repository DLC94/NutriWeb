import React,{Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core';
import {Redirect} from 'react-router-dom'
import '../App.css'

class SignUp extends Component{

    constructor(props){
        super(props)
        this.createNutriologist = this.createNutriologist.bind(this);
    }

    createNutriologist(event){
        event.preventDefault();
        const email = this.emailInput.value;
        const pass = this.passwordInput.value;
        const pass2 = this.password2Input.value;
        console.log(email,pass,pass2);
    }

    render(){
        let token = localStorage.getItem('token');
        if(token){
            return <Redirect to="/pacients" />
        }
        return(
            <div className="formSignUp">
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <form onSubmit={(e)=>{this.createNutriologist(e)}} ref={(form)=>{this.nutriologistForm = form}}>
                    <label className="bp3-label">
                        Email
                        <input style={{width:"100%"}} className="bp3-input" name="email" type="email" ref={(input)=>{this.emailInput=input}} placeholder="Email"/>
                    </label>
                    <label className="bp3-label">
                        Contrase&ntilde;a
                        <input style={{width:"100%"}} className="bp3-input" name="password" type="password" ref={(input)=>{this.passwordInput=input}} placeholder="Contrase&ntilde;a"/>
                    </label>
                    <label className="pt-label">
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