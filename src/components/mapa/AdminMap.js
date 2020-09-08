import React, { Component } from "react";
import { db } from "../../firebase-config";
import { Result, Button, Row } from "antd";

class AdminMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.getDatafb();
    this.getDataAPI();
  };

  getDatafb = () => {
    let arr = [];
    db.collection("sector")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          let data = doc.data();
          console.log("DATA FROM firebase: ", data);
          arr.push(data);
        });
      });
  };

  getDataAPI = () => {
    fetch("http://localhost:4000/markers")
      .then((res) => res.json())
      .then((response) => {
        console.log("DATA FROM API: ", response);
      });
  };

  render() {
    return <div className="container">Pantalla Principal</div>;
  }
}

export default AdminMap;
