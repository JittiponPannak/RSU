import 'dart:async';

import 'package:health_app/excercise.dart';
import 'package:health_app/food.dart';

import 'main.dart';
import 'home.dart';
import 'package:flutter/material.dart';
import 'package:health_app/data.dart';

class BootPage extends StatelessWidget {
  DateTime date = DateTime.now();
  bool longBoot = true;

  BootPage({super.key, DateTime? selectedDate}) {
    longBoot = selectedDate == null;

    if (selectedDate != null) {
      date = selectedDate;
    }
  }

  @override
  Widget build(BuildContext context) {
    Timer(Duration(seconds: longBoot ? 5 : 1), () async {
      Data data = await Data.load(date);

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => HomePage(data: data)),
      );
    });

    return Scaffold(
      backgroundColor: themeGreen,
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Spacer(),
              Icon(Icons.health_and_safety, color: Colors.white, size: 120),
              Text(
                "No X Health Tracker",
                style: TextStyle(color: Colors.white, fontSize: 40),
              ),
              Text(
                "ติดตามสุขภาพของคุณ",
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
              Spacer(),
              CircularProgressIndicator(color: Colors.white),
              Text(
                "\nกำลังเตรียมข้อมูล...",
                style: TextStyle(
                  color: const Color.fromARGB(255, 200, 200, 200),
                  fontSize: 10,
                ),
              ),
              Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}
