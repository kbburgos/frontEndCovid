import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Mapa } from "./components/map";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" component={Mapa} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
