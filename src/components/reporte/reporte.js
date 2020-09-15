import React from "react";
import { db } from "../../firebase-config";
import { Form, Input, Select, Button } from "antd";
import { Route, Link, Redirect, withRouter, Switch } from "react-router-dom";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class reporte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: new URLSearchParams(this.props.location.search),
      email: null,
      sectoruser: null,
      motivo: null,
    };
  }

  componentDidMount() {
    this.setState({
      email: this.state.params.get("email"),
    });
  }

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

  changemotivo = (e) => {
    this.setState({
      motivo: e.target.value,
    });
  };

  action = () => {
    console.log("entra");

    db.collection("reporte")
      .add({
        motivo: this.state.motivo,
        sector: this.state.sectoruser,
        usuario: "bP1PvWi0Ws7SbRXqojeA",
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
      userEmail: this.state.email,
    });

    console.log(params.toString());
    return `?${params.toString()}`;
  };

  render() {
    return (
      <div className="container">
        <h1 style={{ paddingTop: "3rem", textAlign: "center" }}>
          Reportar Zona
        </h1>
        <Form
          className="centrado"
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.action}
        >
          <Form.Item
            label="Motivo"
            name="motivo"
            rules={[{ required: true, message: "Please input your issue" }]}
          >
            <Input className="input" onChange={this.changemotivo} />
          </Form.Item>

          <Form.Item
            label="Sector"
            name="sector"
            rules={[{ required: true, message: "Please input your Sector!" }]}
          >
            <Select onChange={this.onCurrencyChange} value={this.state.sector}>
              <Option value="4zMBtbXeNn9PPIq5NLYC">8 de Mayo</Option>
              <Option value="Q9XvuVCzxo3emXpEDLjl">Cdla. Hector Cobos</Option>
              <Option value="eOgSgI80Bldr2GC1pDo5">Coop. Buena de Dios</Option>
            </Select>
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

export default reporte;
