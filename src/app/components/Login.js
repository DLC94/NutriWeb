import React,{Component} from 'react';
import {Toaster, Intent} from '@blueprintjs/core';
import '../App.css'
import {Redirect} from 'react-router-dom';

class Login extends Component{

    constructor(props){
        super(props);
        this.Auth = this.Auth.bind(this);

        this.state = {
            auth: null
        }
    }

    Auth(event){
        event.preventDefault();
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const body = {email:email,password:password}
        console.log(email,password);
        fetch('/api/nutriologist/signin',{
            method: 'POST',
            body:JSON.stringify(body),
            headers:{
                "Accept":'application/json',
                "Content-Type":'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.token){
                console.log("Hay token")
                localStorage.setItem('token',data.token)
                localStorage.setItem('idNutriologist',data.id);
                this.setState({auth:data.token});
            }else{
                this.toaster.show({intent:Intent.DANGER,message:data.message});
            }
            
        })
        .catch(err => console.error(err))
    }

    render(){
        let token = localStorage.getItem('token');
        //console.log(token);
        if(token){
            return <Redirect to='/dashboard' />
        }
        return(
            <div className="formLogin">
                <Toaster ref={(e)=>{this.toaster = e}}/>
                <hr style={{marginTop:"10px",marginBottom:"10px"}}/>
                <form onSubmit={(event)=>{this.Auth(event)}} ref={(form)=>{this.loginForm = form}}>
                    <label className="bp3-label">
                        Email
                        <input style={{width:"100%"}} className="bp3-input"
                            name="email" type="email" ref={(input)=>{this.emailInput = input}} placeholder="Email"
                        ></input>
                    </label>
                    <label className="bp3-label">
                        Password
                        <input style={{width:"100%"}} className="bp3-input"
                            name="password" type="password" ref={(input)=>{this.passwordInput=input}} placeholder="Password"
                        ></input>
                    </label>
                    <input style={{width:"100%"}} type="submit" className="bp3-button bp3-intent-success" value="Log In"></input>
                </form>
            </div>
        )
    }
}

export default Login;