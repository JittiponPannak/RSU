import 'package:flutter/material.dart';
import 'package:health_app/data.dart';

class ExcercisePage extends StatefulWidget {
  List<ExcercisePreset> presetList = [
    ExcercisePreset(
      Colors.lightGreen,
      "เดิน 30 นาที",
      "เบา",
      "30 น",
      "เดิน",
      30,
      0,
    ),
    ExcercisePreset(
      Colors.redAccent,
      "วิ่ง 20 นาที",
      "หนัก",
      "20 น",
      "วิ่ง",
      20,
      2,
    ),
    ExcercisePreset(
      Colors.amber,
      "ปั่นจักรยาน 45 นาที",
      "ปานกลาง",
      "45 น",
      "ปั่นจักรยาน",
      45,
      1,
    ),
    ExcercisePreset(
      Colors.redAccent,
      "ว่ายน้ำ 30 นาที",
      "หนัก",
      "30 น",
      "ว่ายน้ำ",
      30,
      2,
    ),
    ExcercisePreset(
      Colors.amber,
      "ยิม 1 ชั่วโมง",
      "ปานกลาง",
      "1 ชม",
      "ยิม",
      60,
      1,
    ),
    ExcercisePreset(
      Colors.lightGreen,
      "โยคะ 45 นาที",
      "เบา",
      "45 น",
      "โยคะ",
      45,
      0,
    ),
  ];
  List<int> durationList = [15, 30, 45, 60, 90, 120];

  String? typeSelected;
  int? durationSelected;
  int difficultySelected = 0;

  Data data;

  ExcercisePage({super.key, required this.data});

  @override
  State<StatefulWidget> createState() {
    return _ExcercisePage();
  }
}

class _ExcercisePage extends State<ExcercisePage> {
  void goBack(bool save) {
    if (save) {
      if (widget.typeSelected == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("กรุณาเลือกหรือพิมพ์ประเภทการออกกำลังกาย")),
        );
        return;
      } else if (widget.durationSelected == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("กรุณาเลือกหรือพิมพ์ระยะเวลาทั่วไป")),
        );
        return;
      }
    }

    Data.save(widget.data, widget.data.date!);
    ScaffoldMessenger.of(context).clearSnackBars();
    Navigator.pop(context);
  }

  Widget createTypeWidget(ExcercisePreset preset) {
    return OutlinedButton(
      onPressed: () {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text("คุณได้เลือก ${preset.uiText}")));
        setState(() {
          widget.durationSelected = preset.durationMinute;
          widget.difficultySelected = preset.difficulty;
        });
      },
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: const Color.fromARGB(255, 150, 150, 150)),
        shape: ContinuousRectangleBorder(
          borderRadius: BorderRadius.circular(50),
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Card(
                color: preset.uiColor,
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                  child: Icon(Icons.question_mark, color: Colors.white),
                ),
              ),
              Spacer(),
              Card(
                color: preset.uiColor,
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  child: Text(
                    preset.uiDifficulty,
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ),
            ],
          ),
          Text(
            preset.uiText,
            style: TextStyle(
              color: Colors.black,
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          Row(
            spacing: 5,
            children: [
              Icon(Icons.access_time, color: Colors.black, size: 16),
              Text(preset.uiDuration, style: TextStyle(fontSize: 12, color: Colors.black)),
            ],
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
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
            "เพิ่มการออกกำลังกาย",
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
      body: Padding(
        padding: EdgeInsets.all(5),
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      "การออกกำลังกายยอดนิยม",
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      "แตะเพื่อเพิ่มอย่างรวดเร็ว",
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 12,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 20),
                GridView.count(
                  crossAxisCount: 2,
                  mainAxisSpacing: 8,
                  crossAxisSpacing: 8,
                  childAspectRatio: 1.6,
                  addAutomaticKeepAlives: true,
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  children: widget.presetList
                      .map((e) => createTypeWidget(e))
                      .toList(),
                ),
                SizedBox(height: 20),
                Text(
                  "หรือป้อนข้อมูลด้วยตนเอง",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: FontWeight.w300,
                  ),
                ),
                SizedBox(height: 20),
                Text(
                  "ประเภทการออกกำลังกาย*",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                DropdownMenu(
                  onSelected: (value) {
                    setState(() {
                      widget.typeSelected = value;
                    });
                  },
                  width: MediaQuery.of(context).size.width,
                  hintText: "เลือกหรือพิมพ์ประเภทการออกกำลังกาย",
                  initialSelection: widget.typeSelected,
                  dropdownMenuEntries: widget.presetList
                      .map((ExcercisePreset e) => e.type)
                      .toSet()
                      .map((String e) => DropdownMenuEntry(value: e, label: e))
                      .toList(),
                ),
                SizedBox(height: 20),
                Text(
                  "ระยะเวลา*",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                TimePickerDialog(initialTime: TimeOfDay.now()),
                Text(
                  "ระยะเวลาทั่วไป (หากพิมพ์ให้พิมพ์ในหน่วยนาที)",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: FontWeight.w300,
                  ),
                ),
                DropdownMenu(
                  onSelected: (value) {
                    widget.durationSelected = value!;
                  },
                  initialSelection: widget.durationSelected,
                  width: MediaQuery.of(context).size.width,
                  hintText: "เลือกหรือพิมพ์ระยะเวลานาทีการออกกำลังกาย",
                  dropdownMenuEntries: widget.durationList.map((e) {
                    TimeOfDay time = TimeOfDay(
                      minute: e % 60,
                      hour: (e / 60).floor(),
                    );
                    int totalMinute = (time.hour * 60) + time.minute;
                    String text = time.hour > 0
                        ? "${(totalMinute / 60)} ชม"
                        : "${time.minute} นาที";

                    return DropdownMenuEntry(value: totalMinute, label: text);
                  }).toList(),
                ),
                SizedBox(height: 20),
                Text(
                  "ระดับความหนัก",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Column(
                  spacing: 5,
                  children: [
                    OutlinedButton(
                      onPressed: () {
                        setState(() {
                          widget.difficultySelected = 0;
                        });
                      },
                      style: OutlinedButton.styleFrom(
                        backgroundColor: widget.difficultySelected == 0
                            ? Colors.greenAccent.withAlpha(55)
                            : Colors.transparent,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadiusGeometry.circular(10),
                        ),
                        side: BorderSide(
                          color: widget.difficultySelected == 0
                              ? Colors.green
                              : const Color.fromARGB(255, 150, 150, 150),
                          width: widget.difficultySelected == 0 ? 3 : 2,
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Row(
                          spacing: 20,
                          children: [
                            Icon(
                              Icons.question_mark_outlined,
                              color: Colors.green,
                            ),
                            Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  "เบา",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 20,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                Text(
                                  "การออกกำลังกายเบาๆ เช่น เดินช้า โยคะ",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    OutlinedButton(
                      onPressed: () {
                        setState(() {
                          widget.difficultySelected = 1;
                        });
                      },
                      style: OutlinedButton.styleFrom(
                        backgroundColor: widget.difficultySelected == 1
                            ? Colors.yellowAccent.withAlpha(55)
                            : Colors.transparent,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadiusGeometry.circular(10),
                        ),
                        side: BorderSide(
                          color: widget.difficultySelected == 1
                              ? Colors.yellow
                              : const Color.fromARGB(255, 150, 150, 150),
                          width: widget.difficultySelected == 1 ? 3 : 2,
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Row(
                          spacing: 20,
                          children: [
                            Icon(
                              Icons.question_mark_outlined,
                              color: Colors.yellow.shade600,
                            ),
                            Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  "ปานกลาง",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 20,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                Text(
                                  "การออกกำลังกายปานกลาง เช่น เดินเร็ว ปั่นจักรยาน",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    OutlinedButton(
                      onPressed: () {
                        setState(() {
                          widget.difficultySelected = 2;
                        });
                      },
                      style: OutlinedButton.styleFrom(
                        backgroundColor: widget.difficultySelected == 2
                            ? Colors.redAccent.withAlpha(55)
                            : Colors.transparent,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadiusGeometry.circular(10),
                        ),
                        side: BorderSide(
                          color: widget.difficultySelected == 2
                              ? Colors.red
                              : const Color.fromARGB(255, 150, 150, 150),
                          width: widget.difficultySelected == 2 ? 3 : 2,
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Row(
                          spacing: 20,
                          children: [
                            Icon(
                              Icons.question_mark_outlined,
                              color: Colors.red,
                            ),
                            Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  "หนัก",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 20,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                Text(
                                  "การออกกำลังกายหนักๆ",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(height: 20)
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

class ExcercisePreset extends Object {
  Color uiColor = Colors.lightGreen;
  String uiText = "เดิน 30 นาที";
  String uiDifficulty = "เบา";
  String uiDuration = "1 ชม";
  String type = "";
  int durationMinute = 60;
  int difficulty = 0;

  ExcercisePreset(
    this.uiColor,
    this.uiText,
    this.uiDifficulty,
    this.uiDuration,
    this.type,
    this.durationMinute,
    this.difficulty,
  );
}
