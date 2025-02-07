import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: const Text("6606405"),
        backgroundColor: Colors.black,
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.access_alarm)),
          IconButton(onPressed: () {}, icon: const Icon(Icons.add_box)),
        ],
      ),
      body: Container(
          color: Colors.blue,
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Hello World",
                  style: TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.bold
                  ),
                ),
                Image.asset("assets/jittipon.jpg"),
                Text("Jittipon Pannak (6606405)",
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold
                  ),
                ),
              ],
            )
        ),
      )
    ),
  ));
}
