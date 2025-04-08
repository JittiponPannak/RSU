import 'dart:async';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/services.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: SplashScreen());
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return LoginScreenState();
  }
}

class LoginScreenState extends State<LoginScreen> {
  final _fromKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Login")),
        body: Padding(
            padding: EdgeInsets.all(20),
            child: Form(
              key: _fromKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: _emailController,
                    decoration: const InputDecoration(label: Text("Email")),
                    keyboardType: TextInputType.emailAddress,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your email';
                      } else if (!value.contains('@')) {
                        return 'Please enter valid email';
                      } else {
                        return null;
                      }
                    },
                  ),
                  TextFormField(
                    controller: _passwordController,
                    decoration: const InputDecoration(label: Text("Password")),
                    keyboardType: TextInputType.visiblePassword,
                    obscureText: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your password';
                      } else if (value.length < 6) {
                        return 'Password must be at least 6 characters';
                      } else {
                        return null;
                      }
                    },
                  ),
                  CheckboxListTile(
                    onChanged: (bool? value) => {},
                    title: const Text("Remember Me: "),
                    value: false,
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        if (_fromKey.currentState!.validate()) {
                          final email = _emailController.text;
                          final password = _passwordController.text;
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                              content:
                                  Text('Email: $email\nPassword: $password')));
                        }
                      },
                      child: const Text("Login"),
                    ),
                  )
                ],
              ),
            )));
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return SplashScreenState();
  }
}

class SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 5), () {
      Navigator.of(context)
          .pushReplacement(MaterialPageRoute(builder: (_) => const TabMenu()));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
            child: Column(
      children: [
        Image.asset("assets/R.png"),
        const Text(
          'Jittipon 6606405',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
      ],
    )));
  }
}

class TabMenu extends StatelessWidget {
  const TabMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 3,
        child: Scaffold(
          appBar: AppBar(
            bottom: const TabBar(
                tabs: [Text('Home'), Text('Contract'), Text('My Profile')]),
            title: const Text('6606405'),
          ),
          body: const TabBarView(children: [
            HomeScreen(),
            Text('Contract\nJittipon Pannak (6606405)'),
            LoginScreen()
          ]),
        ));
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return HomeState();
  }
}

class HomeState extends State<HomeScreen> {
  List<Attraction> attractions = [];

  Future<void> readJson() async {
    final String response =
        await rootBundle.loadString('assets/attractions.json');
    final data = await json.decode(response);
    setState(() {
      attractions =
          List<Attraction>.from(data.map((i) => Attraction.fromJson(i)));
    });
  }

  @override
  void initState() {
    super.initState();
    readJson();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: attractions.length,
        itemBuilder: (context, i) {
          return Card(
              child: Column(children: [
            Image.network(attractions[i].coverImage),
            Text(attractions[i].name),
            Text("Rating : " + attractions[i].rating.toString() + "/5"),
            Text("Location: " +
                attractions[i].latitude.toString() +
                "° N," +
                attractions[i].longitude.toString() +
                " ° W"),
            Text(attractions[i].detail),
          ]));
        },
      ),
    );
  }
}

class Attraction {
  final int id;
  final String name;
  final String detail;
  final String coverImage;
  final double latitude;
  final double longitude;
  final int rating;

  Attraction({
    required this.id,
    required this.name,
    required this.detail,
    required this.coverImage,
    required this.latitude,
    required this.longitude,
    required this.rating,
  });

  factory Attraction.fromJson(Map<String, dynamic> json) {
    return Attraction(
      id: json['id'],
      name: json['name'],
      detail: json['detail'],
      coverImage: json['coverimage'],
      latitude: json['latitude'],
      longitude: json['longitude'],
      rating: json['rating'],
    );
  }
}
