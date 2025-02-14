import 'package:flutter/material.dart';
import 'myHome.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: DefaultTabController(
            length: 3,
            child: Scaffold(
              appBar: AppBar(
                centerTitle: true,
                title: const Text("6606405"),
                bottom: const TabBar(tabs: [
                  Tab(icon: Icon(Icons.home), text: 'Home'),
                  Tab(icon: Icon(Icons.newspaper), text: 'News'),
                  Tab(icon: Icon(Icons.contact_page), text: 'Contact Us'),
                ]),
              ),
              body: const TabBarView(children: [MyHome()]),
            )));
  }
}
