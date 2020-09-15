import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from "react-google-maps";
import { Button, Menu, Row, Modal, Tag } from "antd";
import { Link } from "react-router-dom";
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
import { db } from "../../firebase-config";

const { SubMenu } = Menu;

const arrayColores = ["rojo", "amarillo", "verde"];

const AsyncMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={18} defaultCenter={props.Center}>
      <Marker onClick={props.onMarkerClick} position={props.Center}>
        {props.motivo && (
          <Modal
            visible={props.show}
            centered
            title={"Reporte de Zona"}
            footer={[]}
            onCancel={props.close}
          >
            Esta zona ha sido reportada por los siguientes motivos:
            {<br />}
            {<br />}
            {props.motivo}
          </Modal>
        )}
      </Marker>
      {props.puntos &&
        props.puntos.map((coo, index) => (
          <Polygon
            key={"polygon" + index}
            path={coo}
            options={{
              fillColor: Object.values(props.color)[index],
              fillOpacity: 0.1,
              strokeWeight: 1,
              clickable: false,
              zIndex: 2,
            }}
          />
        ))}
    </GoogleMap>
  ))
);

class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMarker: false,
      setShowMarker: false,
      showInfoWindow: false,
      setShowInfoWindow: false,
      lat: null,
      lng: null,
      color: null,
      sector: null,
      sectores: [],
      puntos: null,
      motivo: [],
      veces: [],
      color2: null,
      color3: null,
      modal: true,
      coordenadas: [],
      params: new URLSearchParams(this.props.location.search),
      visible: false,
    };
  }

  getDatafb = () => {
    let tmp = [];
    let sectors = [];
    db.collection("sector")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          let data = doc.data();
          let arr = [];
          console.log(data);
          let arreglo = {
            sector: data,
            id_sector: doc.id,
          };
          sectors.push(arreglo);

          data.puntos.forEach((coord) => {
            let pt = {
              lat: parseFloat(coord.lat),
              lng: parseFloat(coord.lng),
            };
            arr.push(pt);
          });
          tmp.push(arr);
        });
        console.log("puntos: ", tmp);
        console.log("sectores: ", sectors);
        this.setState(
          {
            puntos: tmp,
            sectores: sectors,
          },
          this.getReport(sectors)
        );
      });
  };

  cerrar() {
    this.setState({
      modal: false,
    });
  }

  getReport = (sectors) => {
    let arr = [];
    let motivo1 = [];
    let motivo2 = [];
    let motivo3 = [];
    let cont1 = 0;
    let cont2 = 0;
    let cont3 = 0;
    db.collection("reporte")
      .get()
      .then((query) => {
        query.forEach((doc) => {
          let data = doc.data();
          if (data.sector === "4zMBtbXeNn9PPIq5NLYC") {
            motivo1.push(data.motivo);
            cont1 += 1;
            this.asignarColor(cont1);
          } else if (data.sector === "Q9XvuVCzxo3emXpEDLjl") {
            motivo2.push(data.motivo);
            cont2 += 1;
            this.asignarColor(cont2);
          } else {
            motivo3.push(data.motivo);
            cont3 += 1;
            this.asignarColor(cont3);
          }

          if (data.sector === this.state.sector) {
            arr.push(data.motivo);
          }
        });
      });
    this.setState({
      motivo: arr,
      veces: [
        {
          sector: "4zMBtbXeNn9PPIq5NLYC",
          motivo: motivo1,
        },
        {
          sector: "Q9XvuVCzxo3emXpEDLjl",
          motivo: motivo2,
        },
        {
          sector: "eOgSgI80Bldr2GC1pDo5",
          motivo: motivo3,
        },
      ],
    });
  };

  asignarColor = (cont) => {
    console.log(cont);
    if (cont >= 4) {
      this.setState({
        color: "DARKRED",
      });
    } else if (cont < 4 && cont > 1) {
      this.setState({
        color2: "yellow",
      });
    } else {
      this.setState({
        color3: "green",
      });
    }
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      visible: !this.state.visible,
    });
  };

  componentDidMount() {
    this.setState({
      lat: -2.128367,
      //parseFloat(this.state.params.get("lat")),
      lng: -79.921623,
      sector: this.state.params.get("user"),
      //parseFloat(this.state.params.get("lng")),
    });
    console.log(this.state);
    this.getDatafb();
  }

  getCoords = (lati, ln) => {
    let defaultC = {
      lat: lati,
      lng: ln,
    };
    return defaultC;
  };

  showInfoMarker() {
    this.setState({ modal: true });
  }

  render() {
    let numbers = this.state.motivo;

    const listItems = numbers.map((number, index) => (
      <Tag key={"key" + index}>{number}</Tag>
    ));

    return (
      <div>
        <Row>
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
              {this.state.visible && (
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
                    Mi Zona
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
              )}
            </div>
          </div>
        </Row>
        <AsyncMap
          setShowMarker={true}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `50rem` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          showMarker={true}
          show={this.state.modal}
          motivo={listItems}
          onMarkerClick={() => this.showInfoMarker()}
          close={() => this.cerrar()}
          color={[this.state.color, this.state.color2, this.state.color3]}
          puntos={this.state.puntos}
          Center={this.getCoords(this.state.lat, this.state.lng)}
          googleMapURL={""}
        />{" "}
      </div>
    );
  }
}

export default Mapa;
