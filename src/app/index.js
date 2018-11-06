import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes';
import App from './App'

import '@blueprintjs/core/lib/css/blueprint.css';


render(
    <App/>
,document.getElementById('app'));