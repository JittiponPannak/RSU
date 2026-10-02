import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:csv/csv.dart';
import 'package:health_app/data.dart';
import 'main.dart';

class FoodPage extends StatefulWidget {
  List<String> serveSizeList = ["เล็ก", "กลาง", "ใหญ่"];
  List<FoodMenu>? foodList;
  String? foodName;
  double? foodCalories;
  String? foodImagePath;
  Image? foodImage;

  Data data;

  FoodPage({super.key, required this.data});

  @override
  State<StatefulWidget> createState() {
    return _FoodPage();
  }
}

class _FoodPage extends State<FoodPage> {
  @override
  void initState() {
    loadFoodData();
    super.initState();
  }

  Future<void> loadFoodData() async {
    AssetBundle bundle = DefaultAssetBundle.of(context);
    String foodString = await bundle.loadString('assets/food_menu.csv');
    List<List<dynamic>> foodData = CsvToListConverter().convert(foodString);
    List<FoodMenu> foodList = foodData.sublist(1).map((e) {
      FoodMenu menu = FoodMenu.createFromList(e)!;
      return menu;
    }).toList();

    setState(() {
      widget.foodList = foodList;
    });
  }

  void loadFoodImage() async {
    FilePickerResult? result = await FilePickerIO().pickFiles(
      type: FileType.image,
      allowMultiple: false,
    );

    if (result != null) {
      String filePath = result.files[0].path!;
      File file = File(filePath);
      Image image = Image.file(file);

      setState(() {
        widget.foodImage = image;
        widget.foodImagePath = filePath;
      });
    }
  }

  void goBack(bool save) {
    if (save) {
      if (widget.foodCalories == null || widget.foodCalories! <= 0.0) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text("กรุณาระบุจำนวนแคลอรี่")));
        return;
      } else {
        widget.data.consumedKcal += widget.foodCalories!;
      }

      if (widget.foodImagePath != null) {
        widget.data.foodImageFiles.add(widget.foodImagePath!);
      }
    }

    Data.save(widget.data, widget.data.date!);
    ScaffoldMessenger.of(context).clearSnackBars();
    Navigator.pop(context);
  }

  Widget createMenuPopularWidget(FoodMenu menu) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 5),
      child: OutlinedButton(
        onPressed: () {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(SnackBar(content: Text("คุณได้เลือก ")));
          setState(() {});
        },
        style: OutlinedButton.styleFrom(
          side: BorderSide(color: const Color.fromARGB(255, 150, 150, 150)),
          shape: ContinuousRectangleBorder(
            borderRadius: BorderRadius.circular(36),
          ),
          iconSize: 48,
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 10),
          child: Column(
            children: [
              Icon(Icons.food_bank_outlined, color: themeGreen),
              Text(
                menu.name,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: Colors.black,
                ),
              ),
              Text(
                "${menu.energy} kcal",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: themeGreen,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loadingWidget = Center(
      child: CircularProgressIndicator(color: Colors.black),
    );

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.close),
          onPressed: () => goBack(false),
        ),
        backgroundColor: const Color.fromARGB(255, 250, 250, 250),
        title: Center(
          child: Text(
            "เพิ่มอาหาร",
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => goBack(true),
            child: Text("บันทึก", style: TextStyle(color: Colors.black)),
          ),
        ],
      ),
      body: widget.foodList == null
          ? loadingWidget
          : Padding(
              padding: const EdgeInsets.all(5),
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    spacing: 10,
                    children: [
                      TextFormField(
                        style: TextStyle(height: 2.25),
                        decoration: InputDecoration(
                          icon: Icon(
                            Icons.food_bank_outlined,
                            color: themeGreen,
                            size: 48,
                          ),
                          label: Text(
                            "ระบุชื่ออาหารที่รับประทาน",
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: themeGreen,
                              style: BorderStyle.solid,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: themeGreen,
                              style: BorderStyle.solid,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                          ),
                          border: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: themeGreen,
                              style: BorderStyle.solid,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                          ),
                        ),
                      ),
                      SizedBox(height: 20),
                      Text(
                        "แคลอรี่",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      TextFormField(
                        initialValue: "0",
                        style: TextStyle(
                          fontSize: 48,
                          height: 2.25,
                          fontWeight: FontWeight.w800,
                        ),
                        textAlign: TextAlign.center,
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: themeGreen.withAlpha(10),
                          enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: themeGreen,
                              style: BorderStyle.solid,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: themeGreen,
                              style: BorderStyle.solid,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                          ),
                          border: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: themeGreen,
                              style: BorderStyle.solid,
                              width: 2,
                            ),
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                          ),
                        ),
                        onChanged: (value) {
                          widget.foodCalories = double.tryParse(value);
                        },
                        keyboardType: TextInputType.number,
                        inputFormatters: <TextInputFormatter>[
                          FilteringTextInputFormatter.digitsOnly,
                        ],
                      ),
                      Text(
                        "กรุณาระบุจำนวนแคลอรี่ที่รับประทาน",
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      SizedBox(height: 20),
                      Text(
                        "ขนาดเสิร์ฟ (ไม่บังคับ)",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      DropdownMenu(
                        onSelected: (value) {
                          setState(() {});
                        },
                        width: MediaQuery.of(context).size.width,
                        hintText: "เลือกหรือพิมพ์ประเภทการออกกำลังกาย",
                        initialSelection: widget.serveSizeList,
                        textStyle: TextStyle(height: 2.5),
                        dropdownMenuEntries: widget.serveSizeList
                            .map(
                              (String e) =>
                                  DropdownMenuEntry(value: e, label: e),
                            )
                            .toList(),
                      ),
                      SizedBox(height: 20),
                      Text(
                        "เพิ่มเมนูยอดนิยม",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SingleChildScrollView(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            SizedBox(
                              height: 120,
                              child: ListView.builder(
                                scrollDirection: Axis.horizontal,
                                itemCount: widget.foodList!.length,
                                itemBuilder: (context, index) {
                                  return createMenuPopularWidget(
                                    widget.foodList![index],
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 20),
                      Text(
                        "รูปภาพอาหาร (ไม่บังคับ)",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      SizedBox(
                        width: double.maxFinite,
                        child: OutlinedButton(
                          onPressed: () => loadFoodImage(),
                          style: OutlinedButton.styleFrom(
                            shape: ContinuousRectangleBorder(
                              borderRadius: BorderRadiusGeometry.circular(25),
                              side: BorderSide(
                                color: Colors.black.withAlpha(100),
                              ),
                            ),
                          ),
                          child: Center(
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 30),
                              child: Column(
                                children: [
                                  Icon(
                                    Icons.camera_alt,
                                    size: 48,
                                    color: themeGreen,
                                  ),
                                  Text(
                                    "เพิ่มรูปภาพอาหาร",
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.w600,
                                      color: Colors.black,
                                    ),
                                  ),
                                  Text(
                                    "แตะเพื่อเลือกรูปภาพ",
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w400,
                                      color: Colors.black.withAlpha(200),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                      widget.foodImage == null
                          ? SizedBox()
                          : Column(
                              children: [
                                SizedBox(height: 20),
                                Text(
                                  "ตัวอย่างรูปภาพอาหาร",
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsGeometry.all(25),
                                  child: widget.foodImage!,
                                ),
                              ],
                            ),
                    ],
                  ),
                ),
              ),
            ),
    );
  }
}

class FoodMenu extends Object {
  String name = "";
  double energy = 0.0;
  double carb = 0.0;
  double protein = 0.0;
  double fat = 0.0;
  double sodium = 0.0;

  FoodMenu(
    this.name,
    this.energy,
    this.carb,
    this.protein,
    this.fat,
    this.sodium,
  );

  static FoodMenu? createFromList(List<dynamic> data) {
    FoodMenu? menu;

    if (data.length >= 6) {
      menu = FoodMenu(
        data[0] as String,
        data[1].toDouble(),
        data[2].toDouble(),
        data[3].toDouble(),
        data[4].toDouble(),
        data[5].toDouble(),
      );
    }

    return menu;
  }

  @override
  String toString() {
    return "$name\t$energy\t$carb\t$protein\t$fat\t$sodium";
  }
}
