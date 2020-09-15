import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mapa from "./components/mapa/map";
import Home from "./components/home/home";
import Registro from "./components/registro/registro";
import Login from "./components/login/login";
import information from "./components/information/information";
import Semaforo from "./components/semaforo/semaforo";
import reporte from "./components/reporte/reporte";
import "antd/dist/antd.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/registro" component={Registro} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/" component={Home} exact />
            <Route path="/mapa" component={Mapa} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/information" component={information} exact />
            <Route path="/semaforo" component={Semaforo} exact />
            <Route path="/reporte" component={reporte} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
