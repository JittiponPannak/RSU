import 'dart:convert';

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: DefaultTabController(
            length: 4,
            child: Scaffold(
              appBar: AppBar(
                centerTitle: true,
                title: const Text("6606405"),
                bottom: const TabBar(tabs: [
                  Tab(icon: Icon(Icons.home), text: 'Home'),
                  Tab(icon: Icon(Icons.list), text: 'Description'),
                  Tab(icon: Icon(Icons.note), text: 'More Info'),
                  Tab(icon: Icon(Icons.contact_page), text: 'Contact Us'),
                ]),
              ),
              body: const TabBarView(children: [
                HomePage(),
                Description(),
                MoreInfo(),
                Contract(),
              ]),
    )));
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: SingleChildScrollView(
      child: Container(
        margin: const EdgeInsets.all(10),
        child: Column(
          children: [
            const Text('Recommended Movies', style: TextStyle(fontSize: 30)),
            Image.asset('assets/Jaws.jpg'),
            const Divider(),
            Image.asset('assets/JP.jpg'),
            const Divider(),
            Image.asset('assets/JW.jpg'),
            const Divider(),
            Image.asset('assets/Joker.jpg'),
          ],
        ),
      ),
      ),
    );
  }
}

class Description extends StatelessWidget {
  const Description({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: SingleChildScrollView(
      child: Container(
        margin: const EdgeInsets.all(10),
        child: Column(
          children: [
            const Text('Jaws (1975)', style: TextStyle(fontSize: 30)),
            const Text('When a massive killer shark unleashes chaos on a beach community off Long Island, it\'s up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.', style: TextStyle(fontSize: 20)),
            const Divider(),
            const Text('Jurassic Park (1993)', style: TextStyle(fontSize: 30)),
            const Text('An industrialist invites some experts to visit his theme park of cloned dinosaurs. After a power failure, the creatures run loose, putting everyone\'s lives, including his grandchildren\'s, in danger.', style: TextStyle(fontSize: 20)),
            const Divider(),
            const Text('John Wick (2014)', style: TextStyle(fontSize: 30)),
            const Text('John Wick is a former hitman grieving the loss of his true love. When his home is broken into, robbed, and his dog killed, he is forced to return to action to exact revenge.', style: TextStyle(fontSize: 20)),
            const Divider(),
            const Text('Joker (2019)', style: TextStyle(fontSize: 30)),
            const Text('Arthur Fleck, a party clown and a failed stand-up comedian, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of chaos in Gotham City.', style: TextStyle(fontSize: 20)),
          ],
        ),
      ),
      ),
    );
  }
}

class MoreInfo extends StatelessWidget {
  const MoreInfo({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: SingleChildScrollView(
      child: Container(
        margin: const EdgeInsets.all(10),
        child: Column(
          children: [
            const Text('Jaws (1975)', style: TextStyle(fontSize: 30)),
            const Text('Director		Steven Spielberg', style: TextStyle(fontSize: 20)),
            const Text('Distributor		Universal Pictures', style: TextStyle(fontSize: 15)),
            const Divider(),
            const Text('Jurassic Park (1993)', style: TextStyle(fontSize: 30)),
            const Text('Director		Steven Spielberg', style: TextStyle(fontSize: 20)),
            const Text('Distributor		Universal Pictures', style: TextStyle(fontSize: 15)),
            const Divider(),
            const Text('John Wick (2014)', style: TextStyle(fontSize: 30)),
            const Text('Director		Chad Stahelski', style: TextStyle(fontSize: 20)),
            const Text('Distributor			Summit Entertainment', style: TextStyle(fontSize: 15)),
            const Divider(),
            const Text('Joker (2019)', style: TextStyle(fontSize: 30)),
            const Text('Director		Todd Phillips', style: TextStyle(fontSize: 20)),
            const Text('Distributor			Warner Bros. Pictures', style: TextStyle(fontSize: 15)),
          ],
        ),
      ),
      ),
    );
  }
}

class Contract extends StatelessWidget {
  const Contract({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: SingleChildScrollView(
      child: Container(
        margin: const EdgeInsets.all(10),
        child: Column(
          children: [
            Image.asset('assets/jittipon.jpg'),
            const Text('Jittipon Pannak', style: TextStyle(fontSize: 30)),
            const Text('(6606405)', style: TextStyle(fontSize: 20)),
          ],
        ),
      ),
      ),
    );
  }
}