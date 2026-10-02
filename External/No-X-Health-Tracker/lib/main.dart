import 'boot.dart';
import 'package:flutter/material.dart';

const Color themeGreen = Color.fromARGB(255, 54, 121, 56);

void main() async {
  runApp(App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'No X',
      theme: ThemeData(primarySwatch: Colors.green),
      home: BootPage(),
    );
  }
}
