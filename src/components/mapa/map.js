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

const triangleCoords2 = [
  { lat: -2.12774276884688, lng: -79.92290571883063 },
  { lat: -2.128580995669122, lng: -79.94010071908531 },
  { lat: -2.127272980281045, lng: -79.9402080074459 },
  { lat: -2.1244854028033013, lng: -79.93347796293894 },
  { lat: -2.124431795494788, lng: -79.94098048364219 },
];
const { SubMenu } = Menu;

const AsyncMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={16} defaultCenter={props.Center}>
      <Marker onClick={props.onMarkerClick} position={props.Center}>
        {props.showInfoWindow && console.log("descripcion de la ubicacion")}
      </Marker>

      <Polygon
        path={triangleCoords2}
        options={{
          fillColor: "red",
          fillOpacity: 0.1,
          strokeWeight: 1,
          clickable: false,
          zIndex: 2,
        }}
      />
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
      puntos: null,
      motivo: [],
      veces: 0,
      modal: false,
      coordenadas: [],
      params: new URLSearchParams(this.props.location.search),
      visible: false,
    };
  }

  getDatafb = () => {
    let arr = [];
    db.collection("sector")
      .get()
      .then((query) => {
        console.log(query);
        query.forEach((doc) => {
          console.log(doc);
          let data = doc.data();
          console.log(data);
          console.log(doc.id);
          console.log(this.state.sector);
          if (doc.id === this.state.sector) {
            arr.push(data.puntos);
          }
        });
        console.log("puntos: ", arr);
        this.setState({
          puntos: arr,
        });

        let triangleCoords2 = [
          { lat: -2.12774276884688, lng: -79.92290571883063 },
          { lat: -2.128580995669122, lng: -79.94010071908531 },
          { lat: -2.127272980281045, lng: -79.9402080074459 },
          { lat: -2.1244854028033013, lng: -79.93347796293894 },
          { lat: -2.124431795494788, lng: -79.94098048364219 },
        ];
        return triangleCoords2;
      });
  };

  cerrar = () => {
    this.setState({
      modal: false,
    });
  };

  getReport = () => {
    let arr = [];
    let cont = 0;
    db.collection("reporte")
      .get()
      .then((query) => {
        console.log(query);
        query.forEach((doc) => {
          console.log(doc);
          let data = doc.data();

          if (data.sector === this.state.sector) {
            arr.push(data.motivo);
            cont = cont + 1;
            console.log(cont);
            console.log(data.motivo);
            this.setState({
              veces: cont,
            });
          }
        });
      });
    this.setState({
      motivo: arr,
    });
  };

  createCoordPy = () => {
    let temp = [];
    let data = this.state.puntos;
    console.log(data);
    if (data) {
      data.forEach((re) => {
        let pt = {
          lat: parseFloat(re.lat),
          lng: parseFloat(re.lng),
        };
        temp.push(pt);
      });
    } else {
      console.log("not yet");
    }
    this.setState({
      puntos: temp,
    });
    console.log(this.state.puntos);
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      visible: !this.state.visible,
    });
  };

  componentDidMount() {
    this.setState({
      lat: -2.12774276884688,
      //parseFloat(this.state.params.get("lat")),
      lng: -79.92290571883063,
      sector: this.state.params.get("user"),
      //parseFloat(this.state.params.get("lng")),
    });
    console.log(this.state);
    this.getDatafb();
    this.getReport();
  }

  getCoords = (lati, ln) => {
    let defaultC = {
      lat: lati,
      lng: ln,
    };
    return defaultC;
  };

  showInfoMarker() {
    console.log(this.state.veces);

    this.setState({ color: "rojo", modal: true });
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
        {this.state.modal && (
          <Modal
            visible={this.state.modal}
            centered
            title={"Reporte de Zona"}
            footer={[]}
            onCancel={this.cerrar}
          >
            Esta zona ha sido reportada {this.state.veces} por los siguientes
            motivos:
            {<br />}
            {listItems}
          </Modal>
        )}
        <AsyncMap
          setShowMarker={true}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `50rem` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          showMarker={true}
          showInfoWindow={true}
          onMarkerClick={() => this.showInfoMarker()}
          Center={this.getCoords(this.state.lat, this.state.lng)}
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBsXKuSYJrJZDk03Cc2AfIZIib2M_-raRU&libraries=geometry,drawing,places"
          }
        />{" "}
      </div>
    );
  }
}

export default Mapa;
