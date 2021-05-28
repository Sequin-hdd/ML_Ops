import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './login';
import Register from './register';
import Log from './log';
import ModelList from './model/ModelListlView';
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";



let hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/log" component={Log} />
            <Route path="/modelList" component={ModelList} />
            <Route path="/" component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
