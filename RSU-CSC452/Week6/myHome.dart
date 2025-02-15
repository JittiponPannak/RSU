import 'package:flutter/material.dart';

class MyHome extends StatelessWidget {
  const MyHome({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        margin: const EdgeInsets.all(10),
        child: Column(
          children: [
            const Text('College of Digital Innovation Technology',
                style: TextStyle(fontSize: 30)),
            Image.asset('assets/R.png'),
            const Text('Digital Innovation and Computer Science',
                style: TextStyle(fontSize: 20)),
          ],
        ),
      ),
    );
  }
}
