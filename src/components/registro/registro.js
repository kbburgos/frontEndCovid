import React from "react";
import { Button, Form, Input, Select } from "antd";
import { db } from "../../firebase-config";
import "./registro.css";
import { Link } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

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

      userlast: "",
      username: "",
      useremail: "",
      usercontr: "",
      sectoruser: "",
    };
  }

  state = {
    apellido: [],
    inputValuel: "",
    contrasenia: [],
    inputValuec: "",
    email: [],
    inputValuee: "",
    nombres: [],
    inputValuen: "",
    sector: [],
    inputValues: "",
  };
  stateSector = {
    nombres: [],
  };

  //apellido
  changevaluel = (e) => {
    this.setState({
      userlast: e.target.value,
    });
  };
  //contrasena
  changevaluec = (e) => {
    this.setState({
      usercontr: e.target.value,
    });
  };
  //email
  changevaluee = (e) => {
    this.setState({
      useremail: e.target.value,
    });
  };
  //nombre
  changevaluen = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  action = () => {
    console.log("entra");

    db.collection("usuario")
      .add({
        apellido: this.state.userlast,
        contrasenia: this.state.usercontr,
        email: this.state.useremail,
        nombres: this.state.username,
        sector: this.state.sectoruser,
      })
      .then(() => {
        alert("Se ha registrado con exito");
        this.setState({
          valido: true,
        });
      })
      .catch(() => {
        alert("Error");
        this.setState({
          valido: false,
        });
      });
  };

  parseIncritoToURL = () => {
    let params = new URLSearchParams({
      userSector: this.state.sectoruser,
      userEmail: this.state.userEmail,
    });

    console.log(params.toString());
    return `?${params.toString()}`;
  };

  onCurrencyChange = (newCurrency) => {
    let sectorSelec;
    if (newCurrency === "eOgSgI80Bldr2GC1pDo5") {
      sectorSelec = "eOgSgI80Bldr2GC1pDo5";
    }
    if (newCurrency === "Q9XvuVCzxo3emXpEDLjl") {
      sectorSelec = "Q9XvuVCzxo3emXpEDLjl";
    }
    if (newCurrency === "4zMBtbXeNn9PPIq5NLYC") {
      sectorSelec = "4zMBtbXeNn9PPIq5NLYC";
    }

    console.log(sectorSelec);
    this.setState({
      sectoruser: sectorSelec,
    });
  };

  render() {
    const { sectores } = this.stateSector;
    return (
      <div className="container">
        <h1 style={{ paddingTop: "3rem", textAlign: "center" }}>Registro</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.action}
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input className="input" onChange={this.changevaluen} />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="lastname"
            rules={[{ required: true, message: "Please input your last!" }]}
          >
            <Input className="input" onChange={this.changevaluel} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="input" onChange={this.changevaluee} />
          </Form.Item>
          <Form.Item
            label="Contrasenia"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="input" onChange={this.changevaluec} />
          </Form.Item>

          <Form.Item
            label="Sector"
            name="sector"
            rules={[{ required: true, message: "Please input your Sector!" }]}
          >
            <Select
              onChange={this.onCurrencyChange}
              value={this.state.sector}
              style={{ width: "56%" }}
            >
              <Option value="4zMBtbXeNn9PPIq5NLYC">8 de Mayo</Option>
              <Option value="Q9XvuVCzxo3emXpEDLjl">Cdla. Hector Cobos</Option>
              <Option value="eOgSgI80Bldr2GC1pDo5">Coop. Buena de Dios</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            {!this.state.valido && (
              <Button type="primary" htmlType="submit">
                Registrar
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
export default registro;
