import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import flightSearch from '../Components/flightSearch';
import FlightDetail from '../Components/flightDetails';

class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/" component={flightSearch} />
                        <Route exact path="/flightdetails" component={FlightDetail} />
                        {/* <Route path="*">
                            <PageError />
                        </Route> */}
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}


export default Routes;