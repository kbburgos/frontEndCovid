import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:intl/intl.dart';
import 'package:cloud_firestore/cloud_firestore.dart';


void main() => runApp(MyApp2());

class MyApp2 extends StatelessWidget {
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
  Map data;
  String nombre;
  String apellido;
  String cedula;
  String motivo;
  String motivo2;
  bool autoValidate = true;
  bool readOnly = false;
  bool showSegmentedControl = true;
  final GlobalKey<FormBuilderState> _fbKey = GlobalKey<FormBuilderState>();


  addData(){
    Map<String,dynamic> demo = {"motivo": motivo , 
    "sector": "desconocido", 
    "usuario": cedula };

    CollectionReference collection = Firestore.instance.collection('reporte');
    collection.add(demo);

    // Map<String,dynamic> demo2 = {"apellido": apellido, 
    // "contrasenia": "desconocido", 
    // "email": "desconocido",
    // "nombres": nombre,
    // "sector": "8 de mayo"
    //  };

    // CollectionReference collection2 = Firestore.instance.collection('usuario');
    // collection.add(demo2);

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Reporte"),
      ),
      body: Padding(
        padding: EdgeInsets.all(10),
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              FormBuilder(
                key: _fbKey,
                initialValue: {
                  'date': DateTime.now(),
                  'accept_terms': false,
                },
                autovalidate: true,
                child: Column(
                  children: <Widget>[
                    FormBuilderTextField(
                      attribute: 'text',
                      validators: [FormBuilderValidators.required()],
                      decoration: InputDecoration(labelText: "Nombre"),
                      onChanged: (texto) {
                        nombre = texto;
                      },
                    ),
                    FormBuilderTextField(
                      attribute: 'text',
                      validators: [FormBuilderValidators.required()],
                      decoration: InputDecoration(labelText: "Apellido"),
                      onChanged: (texto) {
                        apellido = texto;
                      },
                    ),
                    FormBuilderDateTimePicker(
                      attribute: "date",
                      inputType: InputType.date,
                      validators: [FormBuilderValidators.required()],
                      format: DateFormat("dd-MM-yyyy"),
                      decoration: InputDecoration(labelText: "Fecha actual"),
                    ),
                    FormBuilderTextField(
                      attribute: "Identificacion",
                      decoration: InputDecoration(labelText: "Cedula"),
                      keyboardType: TextInputType.number,
                      validators: [
                        FormBuilderValidators.numeric(),
                        FormBuilderValidators.max(0999999999),
                      ],
                      onChanged: (texto) {
                        cedula = texto;
                      },
                    ),
                    FormBuilderSlider(
                      attribute: "slider",
                      validators: [FormBuilderValidators.min(6)],
                      min: 0.0,
                      max: 10.0,
                      initialValue: 1.0,
                      divisions: 20,
                      decoration:
                          InputDecoration(labelText: "Nivel de emergencia"),
                    ),
                    FormBuilderCheckboxGroup(
                      decoration:
                          InputDecoration(labelText: "Contravenciones vistas"),
                      attribute: "contravencion",
                      initialValue: ["Gente sin mascarillas"],
                      options: [
                        FormBuilderFieldOption(value: "Gente sin mascarillas"),
                        FormBuilderFieldOption(
                            value: "Incumplimiento de # de placas"),
                        FormBuilderFieldOption(value: "Otros")
                      ],
                      onChanged: ( texto) {
                        motivo2 = texto;
                      },
                    ),
                    FormBuilderTextField(
                      attribute: 'text',
                      validators: [FormBuilderValidators.required()],
                      decoration: InputDecoration(
                          labelText: "Descripcion de lo ocurrido"),
                    ),
                    FormBuilderCheckbox(
                      attribute: 'accept_terms',
                      label: Text(
                          "Yo he estoy de acuerdo con toda la informacion ingresada"),
                      validators: [
                        FormBuilderValidators.requiredTrue(
                          errorText:
                              "Debes aceptar el acuerdo de la informacion",
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Row(
                children: <Widget>[
                  MaterialButton(
                    child: Text("Enviar"),
                    onPressed: () {
                      addData();
                      _fbKey.currentState.save();
                      if (_fbKey.currentState.validate()) {
                        print(_fbKey.currentState.value);
                      }
                    },
                  ),
                  MaterialButton(
                    child: Text("Borrar"),
                    onPressed: () {
                      _fbKey.currentState.reset();
                    },
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
