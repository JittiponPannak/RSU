# PyRueai Programming Language
### A Design Document

**Note:** แนะนำให้เปิดไฟล์ด้วย VSCode พร้อม Preview Side โหมด

## Project by:
- 6606339 ปวิชยา ภูฉายา
- 6606405 จิตติภณ พานนาค
- 6609504 จิรัฎฐ์ แจกอง
- 6606638เจษฎา บุญตาแสง

## Table of contents
- [Introduction](#introduction)
  - [This document is provisional](#this-document-is-provisional)
  - [Tour of the basics](#tour-of-the-basics)
- [Code and comments](#code-and-comments)
- [Primitive types](#primitive-types)
- [Declarations, Definitions, and Scopes](#declarations-definitions-and-scopes)
- [Functions](#functions)
- [User-defined types](#user-defined-types)
  - [Prototypes (Classes)](#prototypes-classes)
  - [Interfaces](#interfaces)
  - [Patching (Dynamic System)](#patching-dynamic-system)
  - [Meta Events](#meta-events)
- [Unfinished tales](#unfinished-tales)
  - [Error handling](#error-handling)
  - [Package Module System](#package-module-system)

## Introduction

PyRueai is a modern, multi-paradigm programming language. It is designed to provide developers with strict type safety while maintaining high dynamic flexibility. The language draws its core design philosophies from several established languages:
* **C Language**: Influences the "Style Syntax", utilizing static variable declarations, requiring semicolons (`;`) to terminate statements, and using curly braces (`{}`) for block scoping.
* **Lua**: Provides the foundational logic for the Prototype-Based Object-Oriented Programming (OOP) model and the Metatable event system.
* **Python**: Inspires the overarching writing style and intuitive developer experience.

### Tour of the basics
Here is a simple script showing some basic PyRueai code:

```c
// Strong typing and C-style declarations
int x = 10;
float pi = 3.14;
string name = "PyRueai";

// Standard function definition
func add(int a, int b) -> int {
    return a + b;
}

// First-class function assignments
func operation = add;
print(operation(3, 4)); // -> 7
```

PyRueai heavily utilizes C-style blocks but strictly enforces types at compile-time instead of waiting for runtime errors. Writing int y = "hello"; will immediately throw a compilation error.
Code and comments
PyRueai relies on standard C-style single-line comments. Comments must start with two slashes //.

```c
// This is a standard comment in PyRueai
```

### Primitive types
PyRueai implements a strong type system for primitives and collections. Primitive types fall into the following core categories:
int: Integer numbers.
float: Floating-point numbers.
string: Standard string text.
bool: Boolean true/false evaluation.
void: Used for functions that return no value.
func: A type specifically representing first-class functions.
Declarations, Definitions, and Scopes
Variable declaration is strictly C-style. Names are introduced by prefixing the identifier with its explicit type.

```c
byte bit = 8;
int count = 10;
float multiplier = 1.5;
char character = 'a';
string text = "test";
```

Scopes are defined strictly by curly braces {...}.
Functions
Functions in PyRueai are treated as first-class citizens. They act similar to Python lambdas and Lua functions. This means functions can be stored in variables, passed as arguments, and defined inline.

```c
// Passing functions as arguments
func apply(func f, int x, int y) -> int {
    return f(x, y);
}

// Inline lambda expression
func multiply = (int a, int b) -> a * b;

print(apply(multiply, 3, 4)); // -> 12
```

### User-defined types
Prototypes (Classes)
PyRueai uses a prototype system (introduced via the proto keyword) instead of traditional C++ or Java classes. An internal new block handles construction, and object properties are accessed using self.

```c
proto Vehicle {
    string brand;
    int speed;
    
    new(string b, int s) {
        self.brand = b;
        self.speed = s;
    }
}
```

### Interfaces
The interface keyword is used to define contracts. Prototypes can conform to interfaces using the implements keyword, and can inherit from other prototypes using the extends keyword.

```C

interface Runnable {
    func run() -> string;
}

proto Car extends Vehicle implements Runnable {
    int fuel;
    
    new(string b, int s, int f) {
        Vehicle.new(self, b, s);
        self.fuel = f;
    }
    
    func run() -> string {
        return self.brand + " running at " + self.speed + "km/h";
    }
}

```

### Patching (Dynamic System)
One of PyRueai's most unique mechanics is the dynamic system accessed via the patch keyword. Developers can dynamically attach new fields and functions to existing instances at runtime.

```C

Car myCar = Car.new("Toyota", 120, 50);

patch myCar {
    string nickname = "PyRueai";
    func badge() -> string {
        return "[" + self.nickname + " | " + self.brand + "]";
    }
}

```

### Meta Events
Drawing from Lua's Metatable system, PyRueai implements Operator Overloading and object lifecycle management via Meta Events.
- _index: Triggered when a key is not found in an instance.
- _newindex: Triggered when assigning a value to an instance.
- _tostring: Converts an object to a string representation (print(obj)).
- _add: Overloads the + operator.
- _sub: Overloads the - operator.
- _mul: Overloads the * operator.
- _eq: Overloads the == operator.
- _lt: Overloads the < operator.
- _le: Overloads the <= operator.
- _call: Allows the object itself to be called like a standard function.

```C

try {
    int result = 10 / 0;
} catch (string err) {
    print("Execution Error: " + err);
}

```

Package Module System
A module layout utilizing import and export to safely encapsulate prototypes and first-class functions across diverse files.

### math_utils.pr
```C

export func calculateArea(int width, int height) -> int {
    return width * height;
}

```

### main.pr
```C

import "math_utils.pr" as math;

int area = math.calculateArea(5, 10);

```

## EBNF

```EBNF

(* ========================================== *)
(* Program & Top-Level Declarations           *)
(* ========================================== *)
program      = { declaration } ;

declaration  = interface_decl 
             | proto_decl 
             | patch_decl 
             | func_decl 
             | var_decl 
             | statement ;

(* ========================================== *)
(* Types & Parameters                         *)
(* ========================================== *)
type         = "int" | "float" | "byte" | "char" | "string" | "bool" | "void" | "func" | IDENT ;
param_list   = type IDENT { "," type IDENT } ;
arg_list     = expr { "," expr } ;

(* ========================================== *)
(* Interfaces, Prototypes & Patching          *)
(* ========================================== *)
interface_decl = "interface" IDENT "{" { func_signature ";" } "}" ;
func_signature = "func" IDENT "(" [param_list] ")" "->" type ;

proto_decl     = "proto" IDENT ["extends" IDENT] ["implements" IDENT {"," IDENT}] "{" { proto_member } "}" ;

proto_member   = field_decl 
               | method_decl 
               | new_decl 
               | meta_decl ;

patch_decl     = "patch" IDENT "{" { patch_member } "}" ;
patch_member   = method_decl | field_decl ;

field_decl     = type IDENT ";" ;
method_decl    = "func" IDENT "(" [param_list] ")" "->" type block ;
new_decl       = "new" "(" [param_list] ")" block ;

meta_decl      = meta_event "(" [param_list] ")" "->" type block ;
meta_event     = "_index" | "_newindex" | "_tostring" 
               | "_add" | "_sub" | "_mul" | "_eq" 
               | "_lt" | "_le" | "_call" ;

(* ========================================== *)
(* Functions & Variables                      *)
(* ========================================== *)
func_decl    = "func" IDENT "(" [param_list] ")" "->" type block ;
var_decl     = type IDENT ["=" expr] ";" 
             | "func" IDENT "=" expr ";" ;

(* ========================================== *)
(* Statements & Blocks                        *)
(* ========================================== *)
block        = "{" { statement } "}" ;

statement    = var_decl 
             | assign_stmt 
             | return_stmt 
             | print_stmt 
             | expr_stmt 
             | if_stmt 
             | try_catch_stmt ;

assign_stmt  = (IDENT | "self" "." IDENT) "=" expr ";" ;
return_stmt  = "return" expr ";" ;
print_stmt   = "print" "(" expr ")" ";" ;
expr_stmt    = [unary_op] expr [unary_op] ";" ;

if_stmt      = "if" "(" expr ")" block ["else" block] ;
try_catch_stmt = "try" block "catch" "(" type IDENT ")" block ;

(* ========================================== *)
(* Expressions                                *)
(* ========================================== *)
expr         = call_expr 
             | member_expr 
             | lambda_expr 
             | binary_expr 
             | primary ;

primary      = IDENT | NUMBER | STRING | "self" "." IDENT | "true" | "false" ;

call_expr    = expr "(" [arg_list] ")" ;
member_expr  = expr "." IDENT ;
lambda_expr  = "(" [param_list] ")" "->" expr ;
binary_expr  = expr binary_op expr ;

(* ========================================== *)
(* Operators                                  *)
(* ========================================== *)
binary_op    = "+" | "-" | "*" | "/" | "==" | "<" | "<=" | ">" | ">=" ;
unary_op     = "++" | "--" ;

(* ========================================== *)
(* Terminals (Regex representations)          *)
(* ========================================== *)
IDENT        = [a-zA-Z_][a-zA-Z0-9_]* ;
NUMBER       = [0-9]+ ("." [0-9]+)? ;
STRING       = '"' { printable_characters } '"' ;

```

## Program Example

### models.pr
```C

export interface Queueable {
    func getInfo() -> string;
}

export proto Customer implements Queueable {
    string name;
    int partySize;
    
    new(string n, int s) {
        self.name = n;
        self.partySize = s;
    }
    
    func getInfo() -> string {
        return "Customer: " + self.name + " (Party of " + self.partySize + ")";
    }
    
    _tostring() -> string {
        return self.getInfo();
    }
}

```

### queue_system.pr
```C

import "models.pr" as md;

export proto QueueNode {
    md.Customer data;
    QueueNode next;
    
    new(md.Customer c) {
        self.data = c;
    }
}

export proto RestaurantQueue {
    QueueNode head;
    QueueNode tail;
    
    int length;
    
    new() {
        self.length = 0;
    }
    
    func enqueue(md.Customer c) -> void {
        QueueNode node = QueueNode.new(c);
        
        if (self.length == 0) {
            self.head = node;
            self.tail = node;
        } else {
            self.tail.next = node;
            self.tail = node;
        }
        
        self.length = self.length + 1;
        
        print(c.name + " joined the queue. Position: " + self.length);
    }
    
    func dequeue() -> md.Customer {
        // ERROR HANDLING PREPARATION: Throw a string error if the queue is empty
        if (self.length == 0) {
            throw "QueueIsEmptyError: There are no customers left to serve!";
        }
        
        md.Customer served = self.head.data;
        self.head = self.head.next;
        self.length = self.length - 1;
        
        print("Now Serving: " + served);
        
        return served;
    }
    
    func getWaitTime() -> int {
        return self.length * 15;
    }
}

```

### main.pr
```C

import "models.pr" as models;
import "queue_system.pr" as qs;

// Initialize the queue from the imported module
qs.RestaurantQueue queue = qs.RestaurantQueue.new();

// Create customers
models.Customer c1 = models.Customer.new("Alice", 2);
models.Customer c2 = models.Customer.new("Bob", 4);

queue.enqueue(c1);
queue.enqueue(c2);

// Serve the two customers
queue.dequeue(); 
queue.dequeue(); 

// ==========================================
// ERROR HANDLING IN ACTION
// ==========================================
// The queue is now empty. Trying to dequeue again will trigger an error.
// We use try-catch to prevent the application from crashing.

try {
    print("Attempting to call the next customer...");
    
    models.Customer ghostCustomer = queue.dequeue(); 
} catch (string err) {
    print("CRITICAL FAILURE CAUGHT -> " + err);
}

// ==========================================
// DYNAMIC SYSTEM (PATCH) ON IMPORTED OBJECTS
// ==========================================
// We can still patch imported prototypes seamlessly.

patch queue {
    func VIP_enqueue(models.Customer c) -> void {
        qs.QueueNode node = qs.QueueNode.new(c);
        
        if (self.length == 0) {
            self.head = node;
            self.tail = node;
        } else {
            node.next = self.head;
            self.head = node;
        }
        
        self.length = self.length + 1;
        
        print("VIP ALERT: " + c.name + " bypassed the queue!");
    }
}

// Test the patched VIP function
models.Customer vip = models.Customer.new("Dave (VIP)", 5);

queue.VIP_enqueue(vip);
queue.dequeue(); // Safely dequeues Dave!

```