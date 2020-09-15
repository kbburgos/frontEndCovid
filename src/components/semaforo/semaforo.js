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

import sem3 from './sem3.jpg';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { db } from "../../firebase-config";
import "./semaforo.css";
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
  



class semaforo extends React.Component {
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
    color:[],
    inputValuec:"",
    correo:[],
    inputValuee:""
    
  }

  changevaluec=(e)=>{
    this.setState({
      inputValuec:e.target.value
    })
    }

    changevaluee=(e)=>{
        this.setState({
          inputValuee:e.target.value
        })
        }

    action = ()=>{
        const {inputValuec,inputValuee}=this.state;
        db.collection("semaforo-color").add({
          color:inputValuec,
            correo:inputValuee
        }
        ).then(()=>{
          alert("Se ha asignado con exito")
        }).catch(()=>{
          alert("Error")
        })
      
      
      }



  render() {
    return (
      <div className="container">





        <Form
          className="centrado"
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          
        >
            <h1 style={{ paddingTop: "3rem", textAlign: "center" }}>Semaforo</h1>
            <img src={sem3} alt="sem3" width="125" height="125"></img>
            <h2 style={{ paddingTop: "3rem", textAlign: "center" }}><strong>Responda a las siguentes preguntas(Suma 1 pt si es verdadera)</strong></h2>
          <h3 style={{ paddingTop: "3rem", textAlign: "center" }}>¿Haz tenido sintomas de covid?</h3>
          <h3 style={{ paddingTop: "3rem", textAlign: "center" }}>¿Sales frecuentemente de casa?</h3>
          <h3 style={{ paddingTop: "3rem", textAlign: "center" }}>¿Tienes algun familiar o amigo cercano con covid?</h3>
          <Form.Item
            label="Color(0,1 pt = verde / 2 pts = amarillo / 3 pts = rojo)"
            name="color"
            rules={[{ required: true, message: "1 pt = verde, 2 pt = amarillo, 3 pt = rojo" }]}
          >
            <Input
              className="input"
              onChange={this.changevaluec}
            />
          </Form.Item>

          
          <Form.Item
            label="Correo"
            name="correo"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className="input"
              onChange={this.changevaluee}
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
export default semaforo;
