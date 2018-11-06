import React, {Component} from 'react';
import Header from './components/Header';
import PacientProfile from './components/PacientProfile';
import Login from './components/Login';
import SignUp from './components/SignUp';

import {BrowserRouter,Route,Redirect, Switch} from 'react-router-dom';

import './App.css';

import PacientList from './components/Pacients';
import FormAddPacient from './components/FormAddPacient';
import Home from './components/Home';
import AddPlanForm from './components/AddPlanForm';
import Logout from './components/Logout';

class App extends Component{

    render(){
        
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <div className="main-content">
                            {/* No Auth */}
                            <Route exact path="/login" render={(props)=>{
                                return <Login/>
                            }}/>
                            <Route exact path="/signin" render={(props)=>{
                                return <SignUp/>
                            }}/>
                            {/* Auth */}
                            <Route exact path="/" render={(props)=>{
                                return <Home/>
                            }}/>
                            <Route exact path="/pacients" render={(props)=>{
                                return <PacientList />
                            }}/>
                            <Route exact path="/pacients/:pacientID" render={(props)=>{
                                const id = props.match.params.pacientID
                                return <PacientProfile pacientID={id}/>
                            }}/>
                            <Route exact path="/add-pacients" render={(props)=>{
                                return <FormAddPacient />
                            }}                           
                            />
                            <Route exact path="/pacients/:pacientID/add-plan" render={(props)=>{
                                const id = props.match.params.pacientID
                                return <AddPlanForm pacientID={id}/>
                            }}/>
                            <Route exact path="/logout" render={(props)=>{
                                return <Logout />
                            }}/>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;