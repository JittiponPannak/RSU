import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

void main() {
  run();
}

Future<void> run() async {
  await AssignmentData.request();
  runApp(const AssignmentApp());
}

class AssignmentApp extends StatelessWidget {
  const AssignmentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "6606405 Jittipon Pannak",
      home: const Assignment(),
      theme: ThemeData(
          appBarTheme: const AppBarTheme(
              backgroundColor: Color.fromARGB(255, 0, 110, 255),
              foregroundColor: Colors.white)),
    );
  }
}

class Assignment extends StatefulWidget {
  const Assignment({super.key});

  @override
  State<StatefulWidget> createState() {
    return AssignmentState();
  }
}

class AssignmentState extends State<Assignment> {
  @override
  Widget build(BuildContext context) {
    List<AssignmentData> database = AssignmentData.database!;
    return Scaffold(
      appBar: AppBar(title: const Text("Main (6606405 Jittipon Pannak)")),
      body: ListView.builder(
        itemCount: database.length,
        itemBuilder: (context, index) {
          final object = database[index];
          return ListTile(
            leading: SizedBox(
              width: MediaQuery.of(context).size.width * 0.2,
              child: Image.network(object.pictureURL, height: 250),
            ),
            title: Text(object.name),
            subtitle: Text(
              object.description,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            onTap: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => AssignmentDetail(id: index),
                  ));
            },
          );
        },
      ),
    );
  }
}

class AssignmentDetail extends StatefulWidget {
  final int id;

  const AssignmentDetail({super.key, required this.id});

  @override
  State<StatefulWidget> createState() {
    return AssignmentDetailState();
  }
}

class AssignmentDetailState extends State<AssignmentDetail> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Detail (6606405 Jittipon Pannak)")),
        body: AssignmentData.database.isEmpty
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(
                      height: 16,
                    ),
                    Text(
                      AssignmentData.database[widget.id].id.toString(),
                    ),
                    Image.network(AssignmentData.database[widget.id].pictureURL,
                        height: 250),
                    const SizedBox(
                      height: 16,
                    ),
                    Text(
                      AssignmentData.database[widget.id].name!,
                      style: const TextStyle(
                          fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    Text(AssignmentData.database[widget.id].description!),
                    const SizedBox(
                      height: 8,
                    ),
                    Text(
                      AssignmentData.database[widget.id].score!,
                      style: const TextStyle(fontSize: 18),
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    Text(
                      AssignmentData.database[widget.id].source!,
                      style: const TextStyle(fontSize: 10),
                    ),
                  ],
                )));
  }
}

class AssignmentData {
  static List<AssignmentData> database = [];

  String id = "";
  String name = "";
  String pictureURL = "";
  String description = "";
  String score = "";
  String source = "";

  static Future<void> request() async {
    final response = await http
        .get(Uri.parse("SECRET ;D"), headers: {"X-Master-Key": "SECRET ;D"});
    Map<String, dynamic> data = json.decode(response.body);
    print(data);

    for (int index = 0; index < data["record"].length; index++) {
      AssignmentData obj = AssignmentData();

      obj.id = data["record"][index]["id"].toString();
      obj.pictureURL = data["record"][index]["picture"].toString();
      obj.name = data["record"][index]["name"].toString();
      obj.description = data["record"][index]["description"].toString();
      obj.score = data["record"][index]["score"].toString();
      obj.source = data["record"][index]["source"].toString();

      database.add(obj);
    }
  }
}
