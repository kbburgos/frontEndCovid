import React from "react";
import {
  Steps,
  Result,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  message,
  Space,Menu, Dropdown,Tooltip
} from "antd";

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { db } from "../../firebase-config";
import "./registro.css";
import { Route, Link, Redirect, withRouter, Switch } from "react-router-dom";
import Home from "../home/home";
import ActionButton from "antd/lib/modal/ActionButton";


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};






class registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
      arr: [],
      valido: false,
      user: null,
      users: [],
    };
  }







  state={
    apellido:[],
    inputValuel:"",
    contrasenia:[],
    inputValuec:"",
    email:[],
    inputValuee:"",
    nombres:[],
    inputValuen:"",
    sector:[],
    inputValues:""
  }
  stateSector={
    nombres:[]


  }

  changevalues=(e)=>{
    this.setState({
      inputValues:"4zMBtbXeNn9PPlq5NLYC"
    })
    }
  
  //apellido
  changevaluel=(e)=>{
    this.setState({
      inputValuel:e.target.value
    })
    }
    //contrasena
    changevaluec=(e)=>{
      this.setState({
        inputValuec:e.target.value
      })
      }
    //email
    changevaluee=(e)=>{
      this.setState({
        inputValuee:e.target.value
      })
      }
      //nombre
    changevaluen=(e)=>{
      this.setState({
        inputValuen:e.target.value
      })
      }
  
  action = ()=>{
    const {inputValuel,inputValuec,inputValuee,inputValuen,inputValues}=this.state;
    db.collection("usuario").add({
      apellido:inputValuel,
      contrasenia:inputValuec,
      email:inputValuee,
      nombres:inputValuen,
      sector:inputValues
    }
    ).then(()=>{
      alert("Se ha registrado con exito")
    }).catch(()=>{
      alert("Error")
    })
  
  
  }
  





  render() {
    const {sectores}=this.stateSector;
    return (
      <div className="container">


<h1 style={{ paddingTop: "3rem", textAlign: "center" }}>Registro</h1>
        <Form
          className="centrado"
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: "Please input your last!" }]}
          >
            <Input
              className="input"
              onChange={this.changevaluel}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="input"
              onChange={this.changevaluec}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className="input"
              onChange={this.changevaluee}
            />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              className="input"
              onChange={this.changevaluen}
            />
          </Form.Item>

          <Form.Item
            label="Sector"
            name="sector"
            rules={[{ required: true, message: "Please input your Sector!" }]}
          >
            <Input
              className="input"
              onChange={this.changevalues}
            />
          </Form.Item>
      


        

          <Form.Item {...tailLayout}>
            {!this.state.valido && (
              <Button type="primary" htmlType="submit" onClick={this.action}>
                Submit
              </Button>
            )}
          </Form.Item>

        </Form>
       
      </div>
    );
  }
}
export default registro;