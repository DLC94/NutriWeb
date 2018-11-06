import React from 'react';
import {Route,Switch} from 'react-router-dom';

import App from './App';
import PacientList from './components/Pacients';
import FormAddPacient from './components/FormAddPacient';

const AppRouter = () => 
    <App>
        <Switch>
            <Route exact path="/pacients" component={PacientList} />
            <Route exact path="/add-pacients" component={FormAddPacient} />
        </Switch>
    </App>;

export default AppRouter;