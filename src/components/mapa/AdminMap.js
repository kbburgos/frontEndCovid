import React from "react";
import firebase from "../../firebase-config";
import { Result, Button, Row } from "antd";

class AdminMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.getDatafb();
    // this.getDataAPI();
  };

  getDatafb = () => {
    let arr = [];
    firebase.firestore
      .collection("sector")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          let data = doc.data();
          console.log("DATA FROM firebase: ", data);
          arr.push(data);
        });
      });
  };

  /*

  getDataAPI = () => {
    fetch("http://localhost:4000/markers")
      .then((res) => res.json())
      .then((response) => {
        console.log("DATA FROM API: ", response);
      });
  };
*/
  render() {
    return (
      <div className="container">
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console">
              Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
        ,
      </div>
    );
  }
}

export default AdminMap;
