import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from "react-google-maps";

const defaultCoor = { lat: -2.084999, lng: -79.934336 };

const triangleCoords = [
  { lat: -2.0837566088354302, lng: -79.9352374920527 },
  { lat: -2.084056817569716, lng: -79.93414315077463 },
  { lat: -2.0842283653921836, lng: -79.93355306479135 },
  { lat: -2.0842390871304595, lng: -79.93347796293894 },
  { lat: -2.0852576519343824, lng: -79.93374618384043 },
  { lat: -2.086683641552164, lng: -79.93406804892221 },
  { lat: -2.0864370419362803, lng: -79.93501218649546 },
  { lat: -2.086286937803335, lng: -79.93576320501963 },
  { lat: -2.086126111930701, lng: -79.93567737433115 },
];

const triangleCoords2 = [
  { lat: -2.128580995669122, lng: -79.94211774026451 },
  { lat: -2.128580995669122, lng: -79.94010071908531 },
  { lat: -2.127272980281045, lng: -79.9402080074459 },
  { lat: -2.1244854028033013, lng: -79.93347796293894 },
  { lat: -2.124431795494788, lng: -79.94098048364219 },
];

export function Mapa(props) {
  const [showMarker, setShowMarker] = React.useState(false);
  const [showInfoWindow, setShowInfoWindow] = React.useState(false);

  /*componentDidMount() {
    console.log("ENTRO AL METODO");
    fetch("http://localhost:4000/markers")
      .then((res) => res.json())
      .then((response) => {
		console.log(response);
      });
  }*/

  return (
    <div>
      <AsyncMap
        setShowMarker={setShowMarker}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `50rem` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        showMarker={showMarker}
        showInfoWindow={showInfoWindow}
        onMarkerClick={() => setShowInfoWindow(true)}
        googleMapURL={API URL}
      />{" "}
    </div>
  );
}

const AsyncMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={16} defaultCenter={defaultCoor}>
      <Marker onClick={props.onMarkerClick} position={defaultCoor}>
        {props.showInfoWindow && console.log("descripcion de la ubicacion")}
      </Marker>
      <Polygon
        key={"polygon" + 1}
        path={triangleCoords}
        options={{
          fillColor: "red",
          fillOpacity: 0.1,
          strokeWeight: 1,
          clickable: false,
          zIndex: 2,
        }}
      />
      <Polygon
        key={"polygon" + 2}
        path={triangleCoords2}
        options={{
          fillColor: "green",
          fillOpacity: 0.1,
          strokeWeight: 1,
          clickable: false,
          zIndex: 2,
        }}
      />
    </GoogleMap>
  ))
);

export default Mapa;
