import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect, Switch } from "react-router-dom";

import "./static/css/App.css";

import Team from "./Team";

const onProduction = true;

export const apiPath = onProduction ? "" : "http://localhost:5000";

export function getCookie(cname) {
    if (!document.cookie) return "";

    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(";");

    for (let cookie of cookiesArray) {
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length);
        }
    }

    return "";
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authToken: null,
            loggedIn: false,
            years: [2019, 2020]
        };
    }

    componentWillMount() {
        const authToken = getCookie("auth_token");

        if (authToken) this.setState({
            authToken,
            loggedIn: true
        });
    }

    render() {
        const { loggedIn, years } = this.state;

        return (
            <Router basename="/equipe">
                <div className="App">
                    <div className="links">
                        {years.map(
                            year => <NavLink className="yearLink" to={"/" + year} activeStyle={{ color: "white" }}>{year}</NavLink>
                        )}
                    </div>

                    <Switch>
                        {years.map(
                            year => <Route path={"/" + year} component={() => <Team loggedIn={loggedIn} year={year} />} />
                        )}
                        <Route component={() => <Redirect to="/2019" />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
