import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong/latlong.dart';
import 'map_key.dart';
import 'main.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  MapController _mapController;
  FlutterMap _flutterMap;
  List<Marker> myMarker = [];
  var data;
  @override
  void initState() {
    super.initState();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.zoom_out),
        onPressed: () {
          // var newZoom = _mapController.zoom - 1;      \\Activar para alejar zoom
          // _mapController.move(_mapController.center, newZoom);
          Navigator.of(context).push(MaterialPageRoute(
            builder: (context) => MyApp2())
            );
        },
      ),
      body: _flutterMap = new FlutterMap(
        mapController: _mapController,
        options: new MapOptions(
          center: new LatLng(-2.1968, -79.8934), //coordenadas de inicio
          zoom: 13.0,
          // onTap: _handleTap,
        ),
        layers: [
          new TileLayerOptions(
            // urlTemplate: "https://api.tiles.mapbox.com/v4/"
            //     "{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}",
            urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            subdomains: ['a', 'b', 'c'],
            additionalOptions: {
              'accessToken': MAP_KEY,
              'id': 'mapbox.streets',
            },
          ),
          new MarkerLayerOptions(
            markers: 

            [
              new Marker(
                width: 80.0,
                height: 80.0,
                point: new LatLng(-2.1968, -79.8934),
                builder: (ctx) => new Container(
                  child: IconButton(
                    icon: Icon(Icons.location_on),
                    color: Color(0xff6200ee),
                    iconSize: 45.0,
                    onPressed: (){

                    },
                    ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // void _handleTap(LatLng point) {
  //   setState(() {
  //     myMarker = [];
  //     myMarker.add(Marker(point: _mapController.center));
  //   });
  // }
}
