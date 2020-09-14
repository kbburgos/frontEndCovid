import React from "react";
import { db } from "../../firebase-config";
import "./registro.css";
import { Steps, Result, Button, Row, Col, Modal } from "antd";

const { Step } = Steps;

class registro extends React.Component {
  render() {
    return (
      <div className="container">
        <Modal
          title="Basic Modal"
          visible={true}
          onOk={this.handleOk}
          centered
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
export default registro;
