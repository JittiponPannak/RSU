import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class CreateUserScreen extends StatefulWidget {
  const CreateUserScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return CreateUserScreenState();
  }
}

class CreateUserScreenState extends State<CreateUserScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _fnameController = TextEditingController();
  final TextEditingController _lnameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _avatarController = TextEditingController();

  Future<void> _create() async {
    final url = Uri.parse('https://backend-sage-iota-82.vercel.app/users');
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode({
      'fname': _fnameController.text,
      'lname': _lnameController.text,
      'username': _emailController.text,
      'password': _passwordController.text,
      'avatar': _avatarController.text,
    });

    final res = await http.post(url, headers: headers, body: body);
    if (!mounted) return; // Check if the widget is still in the widget tree
    if (res.statusCode == 200 || res.statusCode == 201) {
      // Check if the creation was successful
      jsonDecode(res.body);
      _showSnackBar('Create user success'); // Show success message
      Navigator.pop(context);
    } else {
      _showSnackBar(
        'Error creating user',
      ); // Show error message if creation failed
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), duration: const Duration(seconds: 2)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create User')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _fnameController,
                decoration: const InputDecoration(labelText: 'First Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your first name';
                  } else {
                    return null;
                  }
                },
              ),
              TextFormField(
                controller: _lnameController,
                decoration: const InputDecoration(labelText: 'Last Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your last name';
                  } else {
                    return null;
                  }
                },
              ),
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(labelText: 'Email'),
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
                decoration: const InputDecoration(labelText: 'Password'),
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
              TextFormField(
                controller: _avatarController,
                decoration: const InputDecoration(labelText: 'Avatar'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your avatar';
                  } else {
                    return null;
                  }
                },
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      _create();
                    }
                  },
                  child: const Text('CREATE'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
