import * as React from "react";
import "./home.css";
import { Button, Menu } from "antd";
import { Link, Route } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LineChartOutlined,
  SettingOutlined,
  UserOutlined,
  SoundOutlined,
  EnvironmentOutlined,
  AimOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      lat: null,
      lng: null,
      params: new URLSearchParams(this.props.location.search),
    };
    this.getLocation = this.getLocation.bind(this);
    this.coordenates = this.coordenates.bind(this);
  }

  componentDidMount() {
    this.getLocation();
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
    });

    console.log(params.toString());
    return `?${params.toString()}`;
  };

  render() {
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
                Reportar Zona
              </Menu.Item>
              <Menu.Item key="2" icon={<AimOutlined />}>
                Semáforo
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
              <Menu.Item key="4" icon={<LineChartOutlined />}>
                Información Covid
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
