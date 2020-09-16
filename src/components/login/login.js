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
  Space,
} from "antd";
import { db } from "../../firebase-config";
import "./login.css";
import { Link } from "react-router-dom";
import Home from "../home/home";

const { Step } = Steps;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class login extends React.Component {
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
  componentWillMount = () => {
    this.getUser();
  };

  parseIncritoToURL = () => {
    let params = new URLSearchParams({
      userSector: this.state.user.sector,
    });

    console.log(params.toString());
    return `?${params.toString()}`;
  };

  //{"lat":-2.1288175927207904,"lng":-79.92119983389716};{"lat":-2.1289060445274166,"lng":-79.92121324494224};{"lat":-2.1291017106270727,"lng":-79.92122665598731};{"lat":-2.1293710865181494,"lng":-79.9212414081369};{"lat":-2.1296833480642823,"lng":-79.92128834679465};{"lat":-2.129841489080689,"lng":-79.92136613085609};{"lat":-2.129795923026775,"lng":-79.9218194241796};{"lat":-2.1297449962590487,"lng":-79.92225260093551};{"lat":-2.1288309945100097,"lng":-79.92213860705237};{"lat":-2.128763985562794,"lng":-79.9225570316587};{"lat":-2.1296940694896427,"lng":-79.9226830954824};{"lat":-2.1296136587976715,"lng":-79.92313102438789};{"lat":-2.1291286159160245,"lng":-79.92310688450675};{"lat":-2.1288418176569004,"lng":-79.92307469799857};{"lat":-2.128406383011379,"lng":-79.92302100436007}

  handleChangeEmail(e) {
    console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      pass: e.target.value,
    });
  }

  getUser = () => {
    let arr = [];
    db.collection("usuario")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          console.log(doc.data());
          arr.push(doc.data());
        });
      });
    this.setState({
      users: arr,
    });
  };

  loginU = () => {
    try {
      this.state.users.forEach((reg) => {
        if (this.state.email === reg.email) {
          if (this.state.pass === reg.contrasenia) {
            console.log("Correcto");
            message.success("usuario correcto");
            this.setState({
              user: reg,
              valido: true,
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="container">
        <h1
          style={{
            paddingTop: "3rem",
            alignContent: "center",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Login
        </h1>
        <Form
          className="centrado"
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.loginU}
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              className="input"
              onChange={(e) => this.handleChangeEmail(e)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="input"
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            {!this.state.valido && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
            {this.state.valido && (
              <Link to={"/home" + this.parseIncritoToURL()}>
                <Button type="primary">Continuar</Button>
              </Link>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default login;
