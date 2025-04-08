import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class UserDetailPage extends StatefulWidget {
  final int id;

  const UserDetailPage({super.key, required this.id});

  @override
  State<StatefulWidget> createState() {
    return _UserDetailPageState();
  }
}

class _UserDetailPageState extends State<UserDetailPage> {
  Map<dynamic, dynamic>? _userDetail;

  @override
  void initState() {
    super.initState();
    _fetchUserDetail();
  }

  Future<void> _fetchUserDetail() async {
    final response = await http.get(
      Uri.parse('https://backend-sage-iota-82.vercel.app/users/${widget.id}'),
    );
    setState(() {
      _userDetail = json.decode(response.body)[0];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Detail')),
      body:
          _userDetail == null
              ? const Center(child: CircularProgressIndicator())
              : Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.network(_userDetail!['avatar']),
                    const SizedBox(height: 16),
                    Text(
                      _userDetail!['fname'] + " " + _userDetail!['lname'],
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(_userDetail!['username']),
                  ],
                ),
              ),
    );
  }
}
