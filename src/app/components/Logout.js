import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Spinner} from '@blueprintjs/core';

class Logout extends Component{

    constructor(){
        super()
        this.state = {redirect:false}
    }

    componentWillMount(){
        localStorage.removeItem('token');
        this.setState({redirect:true});
    }

    render(){
        //let token = localStorage.getItem('token');
        if(this.state.redirect === true){
            return <Redirect to="/login"/>
        }
        return(
            <div style={{textAlign:"center",position:"absolute",top:"25%",left:"50%"}}>
            <h3>Cerrando Sesion</h3>
            <Spinner/>
            </div>
        );
    }

}

export default Logout;