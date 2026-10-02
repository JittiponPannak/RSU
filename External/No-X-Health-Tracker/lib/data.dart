import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class Data extends Object {
  DateTime? date;
  double dailyKcalGoal = 0.0;
  double dailyKcalCurrent = 0.0;
  double consumedKcal = 0.0;
  double burnedKcal = 0.0;
  List<String> foodImageFiles = [];

  double getGoalDailyLeft() {
    return dailyKcalGoal - dailyKcalCurrent;
  }
  double getGoalPercentage() {
    return dailyKcalCurrent / dailyKcalGoal;
  }
  double getEatenPercentage() {
    return consumedKcal / dailyKcalGoal;
  }
  double getBurntPercentage() {
    return burnedKcal / dailyKcalGoal;
  }

  static Future<bool> save(Data data, DateTime date) async {
    final prefs = await SharedPreferences.getInstance();
    final dateString = getDateKey(date);

    return await prefs.setString(dateString, jsonEncode({
      "dailyKcalGoal": data.dailyKcalGoal,
      "dailyKcalCurrent": data.dailyKcalCurrent,
      "consumedKcal": data.consumedKcal,
      "burnedKcal": data.burnedKcal,
      "foodImageFiles" : jsonEncode(data.foodImageFiles),
    }));
  }
  static Future<Data> load(DateTime date) async {
    final prefs = await SharedPreferences.getInstance();
    final dateString = getDateKey(date);
    final data = Data();

    data.date = date;

    if (prefs.containsKey(dateString)) {
      final prefsDataString = prefs.getString(dateString);
      final prefsData = jsonDecode(prefsDataString!) as Map;

      if (prefsData.containsKey("dailyKcalGoal")) {
        data.dailyKcalGoal = prefsData["dailyKcalGoal"];
      }
      if (prefsData.containsKey("dailyKcalCurrent")) {
        data.dailyKcalCurrent = prefsData["dailyKcalCurrent"];
      }
      if (prefsData.containsKey("consumedKcal")) {
        data.consumedKcal = prefsData["consumedKcal"];
      }
      if (prefsData.containsKey("burnedKcal")) {
        data.burnedKcal = prefsData["burnedKcal"];
      }
      if (prefsData.containsKey("foodImageFiles")) {
        data.foodImageFiles = List<String>.from(jsonDecode(prefsData["foodImageFiles"]) as List);
      }
    }

    return data;
  }
  static Future<bool> isDataExisted(DateTime date) async {
    final prefs = await SharedPreferences.getInstance();
    final dateString = getDateKey(date);

    return prefs.containsKey(dateString);
  }

  static String getDateKey(DateTime date) {
    final year = date.year;
    final month = date.month;
    final day = date.day;
    
    return "$year-$month-$day";
  }
}