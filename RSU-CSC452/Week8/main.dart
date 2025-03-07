import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'assignment.dart';

void main() {
  AssignmentData.request();
  runApp(const AssignmentApp());
  // runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Flutter Demo",
      home: const AttractionsPages(),
      theme: ThemeData(
          appBarTheme: const AppBarTheme(
              backgroundColor: Color.fromARGB(255, 142, 189, 89),
              foregroundColor: Colors.white)),
    );
  }
}

class AttractionsPages extends StatefulWidget {
  const AttractionsPages({super.key});

  @override
  State<StatefulWidget> createState() {
    return AttractionsPageState();
  }
}

class AttractionsPageState extends State<AttractionsPages> {
  List<dynamic> attractions = [];

  Future<void> fetchAttractions() async {
    final response =
        await http.get(Uri.parse('https://www.melivecode.com/api/attractions'));
    setState(() {
      attractions = json.decode(response.body);
    });
  }

  @override
  void initState() {
    super.initState;
    fetchAttractions();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Jittipon 6606405'),
      ),
      body: ListView.builder(
        itemCount: attractions.length,
        itemBuilder: (context, index) {
          final attraction = attractions[index];
          return ListTile(
            leading: SizedBox(
              width: MediaQuery.of(context).size.width * 0.2,
              child: Image.network(attraction["coverimage"]),
            ),
            title: Text(attraction["name"]),
            subtitle: Text(
              attraction["detail"],
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            onTap: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        AttractionDetailPage(id: attraction["id"]),
                  ));
            },
          );
        },
      ),
    );
  }
}

class AttractionDetailPage extends StatefulWidget {
  final int id;

  const AttractionDetailPage({super.key, required this.id});

  @override
  State<StatefulWidget> createState() {
    return AttractionDetailPageState();
  }
}

class AttractionDetailPageState extends State<AttractionDetailPage> {
  Map<String, dynamic>? fetchedDetail;

  Future<void> fetchDetail() async {
    final response = await http.get(Uri.parse(
        'https://www.melivecode.com/api/attractions/' +
            (widget.id).toString()));
    setState(() {
      fetchedDetail = json.decode(response.body);
    });
  }

  @override
  void initState() {
    super.initState;
    fetchDetail();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Detail"),
        ),
        body: fetchedDetail == null
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.network(fetchedDetail!["attraction"]!["coverimage"]),
                    const SizedBox(
                      height: 16,
                    ),
                    Text(
                      fetchedDetail!["attraction"]!["name"],
                      style: const TextStyle(
                          fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    Text(fetchedDetail!["attraction"]!["detail"])
                  ],
                )));
  }
}
