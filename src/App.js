import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Mapa } from "./components/mapa/map";
import AdminMap from "./components/mapa/AdminMap"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/" component={AdminMap} exact />
            <Route path="/mapa" component={Mapa} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
