import 'package:health_app/boot.dart';

import 'main.dart';
import 'excercise.dart';
import 'food.dart';
import 'package:flutter/material.dart';
import 'package:health_app/data.dart';
import 'package:thai_date_formatter/thai_date_formatter.dart';

class HomePage extends StatefulWidget {
  Data data;

  HomePage({super.key, required this.data});

  @override
  State<StatefulWidget> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  void changeDate() async {
    DateTime? toDate = await showDatePicker(
      context: context,
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );

    if (toDate != null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => BootPage(selectedDate: toDate)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    Data data = widget.data;
    DateTime? date = data.date;

    if (date == null) {
      data = Data();
      date = DateTime.now();
    }

    DateTime todayDate = DateTime.now();
    bool isToday =
        date.day == todayDate.day &&
        date.month == todayDate.month &&
        date.year == todayDate.year;

    List<String> dateStringList = ThaiDateFormatter.format(
      date,
      ThaiDateFormatType.fullMonthFullYear,
      showDayOfWeek: true,
    ).split(" ");
    String dateString =
        "${dateStringList[1]} ${dateStringList[2]} ${dateStringList[3]}";

    double dailyKcalGoal = data.dailyKcalGoal;
    double dailyKcalCurrent = data.dailyKcalCurrent;
    double consumedKcal = data.consumedKcal;
    double burnedKcal = data.burnedKcal;

    int goalPercentage = dailyKcalGoal <= 0
        ? 0
        : ((dailyKcalCurrent / dailyKcalGoal) * 100).floor();
    int consumedBurnedPercentage = dailyKcalGoal <= 0
        ? 0
        : ((burnedKcal / consumedKcal) * 100).floor();

    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Center(
          child: Column(
            children: [
              Center(
                child: TextButton(
                  style: TextButton.styleFrom(padding: EdgeInsets.all(15)),
                  onPressed: () {
                    changeDate();
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    spacing: 10,
                    children: [
                      Icon(
                        Icons.calendar_today,
                        color: themeGreen,
                        size: 24,
                        fontWeight: FontWeight.w600,
                      ),
                      Text(
                        isToday ? "วันนี้" : "เปลี่ยนวัน",
                        style: TextStyle(
                          color: themeGreen,
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Text(
                dateString,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 40,
                  fontWeight: FontWeight.w900,
                ),
              ),
              Text(
                dateStringList[0],
                style: TextStyle(
                  color: const Color.fromARGB(255, 100, 100, 100),
                  fontSize: 16,
                ),
              ),
              Spacer(),

              Card(
                child: Padding(
                  padding: EdgeInsets.all(15),
                  child: Text(
                    "ควาบคืบหน้าวันนี้",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              Card(
                child: Padding(
                  padding: EdgeInsets.all(25),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                "เป้าหมายรวม",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w200,
                                ),
                              ),
                              Spacer(),
                              Text(
                                "$goalPercentage%",
                                style: TextStyle(
                                  color: themeGreen,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                            ],
                          ),
                          LinearProgressIndicator(
                            value: goalPercentage / 100,
                            minHeight: 15,
                            color: themeGreen,
                            backgroundColor: const Color.fromARGB(
                              255,
                              220,
                              220,
                              220,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(25)),
                          ),
                        ],
                      ),
                      Text(""),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                "บริโภค",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w200,
                                ),
                              ),
                              Spacer(),
                              Text(
                                "$consumedBurnedPercentage%",
                                style: TextStyle(
                                  color: themeGreen,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                              Spacer(),
                              Text(
                                "เผาพลาญ",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w200,
                                ),
                              ),
                            ],
                          ),
                          LinearProgressIndicator(
                            value: consumedBurnedPercentage / 100,
                            minHeight: 15,
                            color: themeGreen,
                            backgroundColor: const Color.fromARGB(
                              255,
                              220,
                              220,
                              220,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(25)),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              Spacer(),

              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisSize: MainAxisSize.max,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisSize: MainAxisSize.max,
                    children: [
                      Expanded(
                        child: Card(
                          child: Padding(
                            padding: EdgeInsets.all(15).add(
                              EdgeInsetsGeometry.directional(
                                top: 25,
                                bottom: 25,
                              ),
                            ),
                            child: Column(
                              children: [
                                Text(
                                  "เป้าหมายประจำวัน",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                                Text(
                                  "$dailyKcalGoal",
                                  style: TextStyle(
                                    color: themeGreen,
                                    fontSize: 32,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                                Text(
                                  "kcal",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: Card(
                          child: Padding(
                            padding: EdgeInsets.all(15).add(
                              EdgeInsetsGeometry.directional(
                                top: 25,
                                bottom: 25,
                              ),
                            ),
                            child: Column(
                              children: [
                                Text(
                                  "เหลือ",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                                Text(
                                  "$dailyKcalCurrent",
                                  style: TextStyle(
                                    color: themeGreen,
                                    fontSize: 32,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                                Text(
                                  "kcal",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisSize: MainAxisSize.max,
                    children: [
                      Expanded(
                        child: Card(
                          child: Padding(
                            padding: EdgeInsets.all(15).add(
                              EdgeInsetsGeometry.directional(
                                top: 25,
                                bottom: 25,
                              ),
                            ),
                            child: Column(
                              children: [
                                Text(
                                  "บริโภคแล้ว",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                                Text(
                                  "$consumedKcal",
                                  style: TextStyle(
                                    color: themeGreen,
                                    fontSize: 32,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                                Text(
                                  "kcal",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: Card(
                          child: Padding(
                            padding: EdgeInsets.all(15).add(
                              EdgeInsetsGeometry.directional(
                                top: 25,
                                bottom: 25,
                              ),
                            ),
                            child: Column(
                              children: [
                                Text(
                                  "เผาผลาญแล้ว",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                                Text(
                                  "$burnedKcal",
                                  style: TextStyle(
                                    color: themeGreen,
                                    fontSize: 32,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                                Text(
                                  "kcal",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),

              Spacer(),
              Row(
                children: [
                  ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ExcercisePage(data: data),
                        ),
                      ).then((value) => setState(() { }),);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: themeGreen,
                      minimumSize: Size(0, 60),
                    ),
                    child: Row(
                      spacing: 10,
                      children: [
                        Icon(
                          Icons.run_circle_outlined,
                          color: Colors.white,
                          size: 20,
                        ),
                        Text(
                          "ออกกำลังกาย",
                          style: TextStyle(color: Colors.white, fontSize: 20),
                        ),
                      ],
                    ),
                  ),
                  Spacer(),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => FoodPage(data: data),
                        ),
                      ).then((value) => setState(() { }),);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: themeGreen,
                      minimumSize: Size(0, 60),
                    ),
                    child: Row(
                      spacing: 10,
                      children: [
                        Icon(
                          Icons.food_bank_outlined,
                          color: Colors.white,
                          size: 20,
                        ),
                        Text(
                          "เพิ่มอาหาร",
                          style: TextStyle(color: Colors.white, fontSize: 20),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
