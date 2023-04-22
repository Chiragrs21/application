import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import RegistrationForm from './App';
import Success from './Upload';

class Main extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/application" component={RegistrationForm} />
                    <Route path="/success" component={Success} />
                </Switch>
            </Router>
        );
    }
}

export default Main;
