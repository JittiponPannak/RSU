import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'userdetail.dart';
import 'createuserdetail.dart';
import 'dart:convert';
import 'updateuserdetail.dart';

class UserPage extends StatefulWidget {
  const UserPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return UserPageState();
  }
}

class UserPageState extends State<UserPage> {
  List<dynamic> _users = [];

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  Future<void> _fetchUsers() async {
    final response = await http.get(
      Uri.parse('https://backend-sage-iota-82.vercel.app/users'),
    );
    setState(() {
      _users = json.decode(response.body);
    });
  }

  Future<void> _delUsers(id, index) async {
    final url = Uri.parse('https://backend-sage-iota-82.vercel.app/users');
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode({'id': id});
    final res = await http.delete(url, headers: headers, body: body);
    print(res);
    setState(() {
      _users.removeAt(index); // Remove the user from the list
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Jittipon 6606405')),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) => const CreateUserScreen(),
                ),
              );
            },
            child: const Text('CREATE'),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _users.length,
              itemBuilder: (context, index) {
                final user = _users[index];
                return ListTile(
                  leading: SizedBox(
                    width: MediaQuery.of(context).size.width * 0.2,
                    child: Image.network(user!['avatar']),
                  ),
                  title: Text(user["fname"]),
                  subtitle: Text(user["username"]),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => UserDetailPage(id: user['id']),
                      ),
                    );
                  },
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          _delUsers(user['id'], index);
                        },
                        style: ElevatedButton.styleFrom(
                          foregroundColor: Colors.white,
                          backgroundColor: Colors.red,
                        ),
                        child: const Text('DEL'),
                      ),
                      const SizedBox(width: 4),
                      ElevatedButton(
                        onPressed: () {
                          // Your logic to handle user update, possibly navigating to a user update screen
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder:
                                  (context) => UpdateUserScreen(id: user['id']),
                            ),
                          ); // Assuming CreateUserScreen can handle updates
                        },
                        style: ElevatedButton.styleFrom(
                          foregroundColor: Colors.white,
                          backgroundColor: Colors.blue,
                        ),
                        child: const Text('EDIT'),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
