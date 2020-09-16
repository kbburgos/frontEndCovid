import * as React from "react";
import "./home.css";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  UserOutlined,
  SoundOutlined,
  EnvironmentOutlined,
  AimOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import documento from "../../covid.json";

const { SubMenu } = Menu;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      lat: null,
      lng: null,
      data: null,
      datafinal: null,
      params: new URLSearchParams(this.props.location.search),
    };
    this.getLocation = this.getLocation.bind(this);
    this.coordenates = this.coordenates.bind(this);
  }

  componentDidMount() {
    this.getLocation();
    this.llenarTabla(documento);
  }

  llenarTabla(arreglo) {
    let temp = [];
    for (let index = 0; index < arreglo.length; index++) {
      console.log(arreglo[index]);
      let dataTable = {
        key: index,
        provincia: arreglo[index].provincia,
        casos: parseInt(arreglo[index].casos),
      };
      temp.push(dataTable);
    }

    this.setState({
      data: temp,
    });

    this.ObtenerCantidad(temp);

    console.log(temp);
  }

  ObtenerCantidad(coleccion) {
    let dataTemp = [];
    console.log(coleccion);
    dataTemp.push(["provincia", "casos"]);
    coleccion.map((data) => {
      dataTemp.push([data.provincia, parseInt(data.casos)]);
    });

    console.log(dataTemp);

    this.setState(
      {
        datafinal: dataTemp,
      },
      () => {
        console.log(this.state.datafinal);
      }
    );
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.coordenates);
    }
  }

  coordenates(position) {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    console.log(position);
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  parseIncritoToURL = () => {
    let params = new URLSearchParams({
      lat: this.state.lat,
      lng: this.state.lng,
      user: this.state.params.get("userSector"),
      email: this.state.params.get("userEmail"),
    });

    console.log(params.toString());
    return `?${params.toString()}`;
  };
  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div
          className="back"
          style={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
          }}
        >
          hello men
        </div>
        <div
          className="cover"
          style={{
            position: "absolute",
            zIndex: 2,
          }}
        ></div>
        <div
          className="centradochar"
          style={{ position: "absolute", zIndex: 3 }}
        >
          <div>
            <Chart
              width={"100%"}
              height={"100%"}
              style={{ padding: "1rem", marginTop: "3rem" }}
              chartType="GeoChart"
              data={[
                ["Pais", "Casos covid"],
                ["Brazil", 4349544],
                ["Peru", 733860],
                ["Colombia", 721892],
                ["Argentina", 565446],
                ["Chile", 437983],
                ["Ecuador", 118911],
                ["Uruguay", 1812],
              ]}
              options={{
                region: "005",
                colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
                backgroundColor: "#81d4fa",
                datalessRegionColor: "#f8bbd0",
                defaultColor: "#f5f5f5",
              }}
              rootProps={{ "data-testid": "4" }}
            />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 3,
          }}
        >
          <div style={{ width: 256 }}>
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
              style={{ marginBottom: 16 }}
            >
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
              )}
            </Button>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1" icon={<CloseCircleOutlined />}>
                <Link to={"/reporte"}>Reportar Zona</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<AimOutlined />}>
                <Link to={"/semaforo"}>Semáforo</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<EnvironmentOutlined />}>
                <Link to={"/mapa" + this.parseIncritoToURL()}>Mi Zona</Link>
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="Cuenta">
                <Menu.Item key="7" icon={<SettingOutlined />}>
                  Configuración
                </Menu.Item>
                <Menu.Item key="6" icon={<SoundOutlined />}>
                  Notificaciones
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
