# Java Tutorial

Our core Java programming tutorial is designed for students and working professionals. Java is an object-oriented, class-based, concurrent, secured and general-purpose computer-programming language. It is a widely used robust technology.

## What is Java?

Java is a programming language and a platform. Java is a high level, robust, object-oriented and secure programming language.

Java was developed by **Sun Microsystems** (which is now the subsidiary of Oracle) in the year 1995. James Gosling is known as the father of Java. Before Java, its name was Oak. Since Oak was already a registered company, so James Gosling and his team changed the name from Oak to Java.

**Platform:** Any hardware or software environment in which a program runs, is known as a platform. Since Java has a runtime environment (**JRE**) and API, it is called a platform.

### Java Example

`// Simple.java public class Simple{ public static void main(String args[]){ System.out.println("Hello Java"); } }`

`// Simple.java public class Simple{ public static void main(String args[]){ System.out.println("Hello Java"); } }`

## Application

According to Sun, 3 billion devices run Java. There are many devices where Java is currently used. Some of them are as follows:

- Desktop Applications such as acrobat reader, media player, antivirus, etc.
- Web Applications such as irctc.co.in, javatpoint.com, etc.
- Enterprise Applications such as banking applications.
- Mobile
- Embedded System
- Smart Card
- Robotics
- Games, etc

## Types of Java Applications

There are mainly 4 types of applications that can be created using Java programming:

1. Standalone Application Standalone applications are also known as desktop applications or window-based applications. These are traditional software that we need to install on every machine. Examples of standalone application are Media player, antivirus, etc. AWT and Swing are used in Java for creating standalone applications.
2. Web Application An application that runs on the server side and creates a dynamic page is called a web application. Currently, Servlet, JSP, Struts, Spring, Hibernate, JSF, etc. technologies are used for creating web applications in Java.
3. Enterprise Application An application that is distributed in nature, such as banking applications, etc. is called an enterprise application. It has advantages like high-level security, load balancing, and clustering. In Java, EJB is used for creating enterprise applications.
4. Mobile Application An application which is created for mobile devices is called a mobile application. Currently, Android and Java ME are used for creating mobile applications.

## Java Version History

Many java versions have been released till now. The current stable release of Java is Java SE 10.

1. JDK Alpha and Beta (1995)
2. JDK 1.0 (23rd Jan 1996)
3. JDK 1.1 (19th Feb 1997)
4. J2SE 1.2 (8th Dec 1998)
5. J2SE 1.3 (8th May 2000)
6. J2SE 1.4 (6th Feb 2002)
7. J2SE 5.0 (30th Sep 2004)
8. Java SE 6 (11th Dec 2006)
9. Java SE 7 (28th July 2011)
10. Java SE 8 (18th Mar 2014)
11. Java SE 9 (21st Sep 2017)
12. Java SE 10 (20th Mar 2018)
13. Java SE 11 (September 2018)
14. Java SE 12 (March 2019)
15. Java SE 13 (September 2019)
16. Java SE 14 (Mar 2020)
17. Java SE 15 (September 2020)
18. Java SE 16 (Mar 2021)
19. Java SE 17 (September 2021)
20. Java SE 18 (to be released by March 2022)

## Object-oriented

Java is an object-oriented programming language. Everything in Java is an object. Object-oriented means we organize our software as a combination of different types of objects that incorporate both data and behavior. Object-oriented programming (OOPs) is a methodology that simplifies software development and maintenance by providing some rules. Basic concepts of OOPs are:

- Object
- Class
- Inheritance
- Polymorphism
- Abstraction
- Encapsulation

## Platform Independent

[![](http://learnfromexamples.com/wp-content/uploads/2019/05/How-Java-is-Platform-is-Independent.png)](http://learnfromexamples.com/wp-content/uploads/2019/05/How-Java-is-Platform-is-Independent.png)

http://learnfromexamples.com/wp-content/uploads/2019/05/How-Java-is-Platform-is-Independent.png

Java is platform independent Java is platform independent because it is different from other languages like C, C++, etc. which are compiled into platform specific machines while Java is a write once, run anywhere language. A platform is the hardware or software environment in which a program runs.

There are two types of platforms software-based and hardware-based. Java provides a software-based platform.

The Java platform differs from most other platforms in the sense that it is a software-based platform that runs on top of other hardware-based platforms. It has two components:

- Runtime Environment
- API(Application Programming Interface)

Java code can be executed on multiple platforms, for example, Windows, Linux, Sun Solaris, Mac/OS, etc. Java code is compiled by the compiler and converted into bytecode. This bytecode is a platform-independent code because it can be run on multiple platforms, i.e., Write Once and Run Anywhere (WORA)

## Secured

Java is best known for its security. With Java, we can develop virus-free systems. Java is secured because:

- **No explicit pointer**
- **Java Programs run inside a virtual machine sandbox**
- **how Java is secured**
- **Classloader:** Classloader in Java is a part of the Java Runtime Environment (JRE) which is used to load Java classes into the Java Virtual Machine dynamically. It adds security by separating the package for the classes of the local file system from those that are imported from network sources.
- **Bytecode Verifier:** It checks the code fragments for illegal code that can violate access rights to objects.
- **Security Manager:** It determines what resources a class can access such as reading and writing to the local disk. Java language provides these securities by default. Some security can also be provided by an application developer explicitly through SSL, JAAS, Cryptography, etc.

## Robust

The English mining of Robust is strong. Java is robust because:

- It uses strong memory management.
- There is a lack of pointers that avoids security problems.
- Java provides automatic garbage collection which runs on the Java Virtual Machine to get rid of objects which are not being used by a Java application anymore.
- There are exception handling and the type checking mechanism in Java. All these points make Java robust.

## Architecture-neutral

Java is architecture neutral because there are no implementation dependent features, for example, the size of primitive types is fixed.

In C programming, int data type occupies 2 bytes of memory for 32-bit architecture and 4 bytes of memory for 64-bit architecture. However, it occupies 4 bytes of memory for both 32 and 64-bit architectures in Java.

## Portable

Java is portable because it facilitates you to carry the Java bytecode to any platform. It doesn’t require any implementation.

## High-performance

Java is faster than other traditional interpreted programming languages because Java bytecode is “close” to native code. It is still a little bit slower than a compiled language (e.g., C++). Java is an interpreted language that is why it is slower than compiled languages, e.g., C, C++, etc.

## Distributed

Java is distributed because it facilitates users to create distributed applications in Java. RMI and EJB are used for creating distributed applications. This feature of Java makes us able to access files by calling the methods from any machine on the internet.

## Multi-threaded

A thread is like a separate program, executing concurrently. We can write Java programs that deal with many tasks at once by defining multiple threads. The main advantage of multi-threading is that it doesn’t occupy memory for each thread. It shares a common memory area. Threads are important for multi-media, Web applications, etc.

## Dynamic

Java is a dynamic language. It supports the dynamic loading of classes. It means classes are loaded on demand. It also supports functions from its native languages, i.e., C and C++.

Java supports dynamic compilation and automatic memory management (garbage collection).

|   |   |   |
|---|---|---|
|Comparison Index|C++|Java|
|Platform-independent|C++ is platform-dependent.|Java is platform-independent.|
|Mainly used for|C++ is mainly used for system programming.|Java is mainly used for application programming. It is widely used in Windows-based, web-based, enterprise, and mobile applications.|
|Design Goal|C++ was designed for systems and applications programming. It was an extension of the C programming language.|Java was designed and created as an interpreter for printing systems but later extended as a support network computing. It was designed to be easy to use and accessible to a broader audience.|
|Goto|C++ supports the goto statement.|Java doesn’t support the goto statement.|
|Multiple inheritance|C++ supports multiple inheritance.|Java doesn’t support multiple inheritance through class. It can be achieved by using interfaces in java.|
|Operator Overloading|C++ supports operator overloading.|Java doesn’t support operator overloading.|
|Pointers|C++ supports pointers. You can write a pointer program in C++.|Java supports pointer internally. However, you can’t write the pointer program in java. It means java has restricted pointer support in java.|
|Compiler and Interpreter|C++ uses compiler only. C++ is compiled and run using the compiler which converts source code into machine code so, C++ is platform dependent.|Java uses both compiler and interpreter. Java source code is converted into bytecode at compilation time. The interpreter executes this bytecode at runtime and produces output. Java is interpreted that is why it is platform-independent.|
|Call by Value and Call by reference|C++ supports both call by value and call by reference.|Java supports call by value only. There is no call by reference in java.|
|Structure and Union|C++ supports structures and unions.|Java doesn’t support structures and unions.|
|Thread Support|C++ doesn’t have built-in support for threads. It relies on third-party libraries for thread support.|Java has built-in thread support.|
|Documentation comment|C++ doesn’t support documentation comments.|Java supports documentation comment (/** … */) to create documentation for java source code.|
|Virtual Keyword|C++ supports virtual keyword so that we can decide whether or not to override a function.|Java has no virtual keyword. We can override all non-static methods by default. In other words, non-static methods are virtual by default.|
|unsigned right shift >>>|C++ doesn’t support >>> operator.|Java supports unsigned right shift >>> operator that fills zero at the top for the negative numbers. For positive numbers, it works same like >> operator.|
|Inheritance Tree|C++ always creates a new inheritance tree.|Java always uses a single inheritance tree because all classes are the child of the Object class in Java. The Object class is the root of the inheritance tree in java.|
|Hardware|C++ is nearer to hardware.|Java is not so interactive with hardware.|
|Object-oriented|C++ is an object-oriented language. However, in the C language, a single root hierarchy is not possible.|Java is also an object-oriented language. However, everything (except fundamental types) is an object in Java. It is a single root hierarchy as everything gets derived from java.lang.Object.|

## Creating Hello World Example

`// Simple.java class Simple{ public static void main(String args[]){ System.out.println("Hello Java"); } }`

`// Simple.java class Simple{ public static void main(String args[]){ System.out.println("Hello Java"); } }`

**To compile:** javac Simple.java **To execute:** java Simple

## Parameters used in First Java Program

Let’s see what is the meaning of class, public, static, void, main, String[], System.out.println().

- **class** keyword is used to declare a class in Java.
- **public** keyword is an access modifier that represents visibility. It means it is visible to all.
- **static** is a keyword. If we declare any method as static, it is known as the static method. The core advantage of the static method is that there is no need to create an object to invoke the static method. The main() method is executed by the JVM, so it doesn’t require creating an object to invoke the main() method. So, it saves memory.
- **void** is the return type of the method. It means it doesn’t return any value.
- **main** represents the starting point of the program.
- **String[] args or String args[]** is used for command line argument. We will discuss it in coming section.
- **System.out.println()** is used to print statement. Here, System is a class, out is an object of the PrintStream class, println() is a method of the PrintStream class. We will discuss the internal working of System.out.println() statement in the coming section.

## Difference between JDK, JRE, and JVM

We must understand the differences between JDK, JRE, and JVM before proceeding further to Java. See the brief overview of JVM here.

If you want to get the detailed knowledge of Java Virtual Machine, move to the next page. Firstly, let’s see the differences between the JDK, JRE, and JVM.

### JVM

JVM (Java Virtual Machine) is an abstract machine. It is called a virtual machine because it doesn’t physically exist. It is a specification that provides a runtime environment in which Java bytecode can be executed. It can also run those programs which are written in other languages and compiled to Java bytecode. JVMs are available for many hardware and software platforms. JVM, JRE, and JDK are platform dependent because the configuration of each OS is different from each other. However, Java is platform independent. There are three notions of the JVM: specification, implementation, and instance. The JVM performs the following main tasks:

- Loads code
- Verifies code
- Executes code
- Provides runtime environment

### JRE

JRE is an acronym for Java Runtime Environment. It is also written as Java RTE. The Java Runtime Environment is a set of software tools which are used for developing Java applications. It is used to provide the runtime environment. It is the implementation of JVM. It physically exists. It contains a set of libraries + other files that JVM uses at runtime. The implementation of JVM is also actively released by other companies besides Sun Micro Systems.

### JDK

JDK is an acronym for Java Development Kit. The Java Development Kit (JDK) is a software development environment which is used to develop Java applications and applets. It physically exists. It contains JRE + development tools.

JDK is an implementation of any one of the below given Java Platforms released by Oracle Corporation:

- Standard Edition Java Platform
- Enterprise Edition Java Platform
- Micro Edition Java Platform The JDK contains a private Java Virtual Machine (JVM) and a few other resources such as an interpreter/loader (java), a compiler (javac), an archiver (jar), a documentation generator (Javadoc), etc. to complete the development of a Java Application.

## JVM (Java Virtual Machine) Architecture

JVM (Java Virtual Machine) is an abstract machine. It is a specification that provides runtime environment in which java bytecode can be executed. JVMs are available for many hardware and software platforms (i.e. JVM is platform dependent).

### What is JVM

A specification where working of Java Virtual Machine is specified. But implementation provider is independent to choose the algorithm. Its implementation has been provided by Oracle and other companies. An implementation Its implementation is known as JRE (Java Runtime Environment). Runtime Instance Whenever you write java command on the command prompt to run the java class, an instance of JVM is created.

### What it does

The JVM performs following operation:

- Loads code
- Verifies code
- Executes code
- Provides runtime environment

### JVM provides definitions for the:

- Memory area
- Class file format
- Register set
- Garbage-collected heap
- Fatal error reporting etc.

## JVM Architecture

Let’s understand the internal architecture of JVM. It contains classloader, memory area, execution engine etc.

### Classloader

Classloader is a subsystem of JVM which is used to load class files. Whenever we run the java program, it is loaded first by the classloader. There are three built-in classloaders in Java.

- **Bootstrap ClassLoader:** This is the first classloader which is the super class of Extension classloader. It loads the rt.jar file which contains all class files of Java Standard Edition like java.lang package classes, java.net package classes, java.util package classes, java.io package classes, java.sql package classes etc.
- **Extension ClassLoader:** This is the child classloader of Bootstrap and parent classloader of System classloader. It loades the jar files located inside $JAVA_HOME/jre/lib/ext directory.
- **System/Application ClassLoader:** This is the child classloader of Extension classloader. It loads the classfiles from classpath. By default, classpath is set to current directory. You can change the classpath using “-cp” or “-classpath” switch. It is also known as Application classloader.

### Class(Method) Area

Class(Method) Area stores per-class structures such as the runtime constant pool, field and method data, the code for methods.

### Heap

It is the runtime data area in which objects are allocated.

### Stack

Java Stack stores frames. It holds local variables and partial results, and plays a part in method invocation and return. Each thread has a private JVM stack, created at the same time as thread. A new frame is created each time a method is invoked. A frame is destroyed when its method invocation completes.

### Program Counter Register

PC (program counter) register contains the address of the Java virtual machine instruction currently being executed.

### Native Method Stack

It contains all the native methods used in the application.

### Execution Engine

It contains:

- A virtual processor
- Interpreter: Read bytecode stream then execute the instructions.
- Just-In-Time(JIT) compiler: It is used to improve the performance. JIT compiles parts of the byte code that have similar functionality at the same time, and hence reduces the amount of time needed for compilation. Here, the term “compiler” refers to a translator from the instruction set of a Java virtual machine (JVM) to the instruction set of a specific CPU.

### Java Native Interface

Java Native Interface (JNI) is a framework which provides an interface to communicate with another application written in another language like C, C++, Assembly etc. Java uses JNI framework to send output to the Console or interact with OS libraries.

## Java Variables

A variable is a container which holds the value while the Java program is executed. A variable is assigned with a data type. Variable is a name of memory location. There are three types of variables in java: local, instance and static. There are two types of data types in Java: **primitive** and **non-primitive.**

- **Local Variable** A variable declared inside the body of the method is called local variable. You can use this variable only within that method and the other methods in the class aren’t even aware that the variable exists. A local variable cannot be defined with “static” keyword.
- **Instance Variable** A variable declared inside the class but outside the body of the method, is called an instance variable. It is not declared as static. It is called an instance variable because its value is instance-specific and is not shared among instances.
- **Static variable** A variable that is declared as static is called a static variable. It cannot be local. You can create a single copy of the static variable and share it among all the instances of the class. Memory allocation for static variables happens only once when the class is loaded in the memory.

`//A.java public class A { static int m=100;//static variable void method() { int n=90;//local variable } public static void main(String args[]) { int data=50;//instance variable } }//end of class`

`//A.java public class A { static int m=100;//static variable void method() { int n=90;//local variable } public static void main(String args[]) { int data=50;//instance variable } }//end of class`

## Data Types in Java

Data types specify the different sizes and values that can be stored in the variable. There are two types of data types in Java:

- **Primitive data types:** The primitive data types include boolean, char, byte, short, int, long, float and double.
- **Non-primitive data types:** The non-primitive data types include Classes, Interfaces, and Arrays.

### Java Primitive Data Types

In Java language, primitive data types are the building blocks of data manipulation. These are the most basic data types available in Java language.

> Java is a statically-typed programming language. It means, all variables must be declared before its use. That is why we need to declare variable’s type and name.

There are 8 types of primitive data types:

- boolean data type
- byte data type
- char data type
- short data type
- int data type
- long data type
- float data type
- double data type

|   |   |   |
|---|---|---|
|Data Type|Default Value|Default size|
|boolean|false|1 bit|
|char|‘000’|2 byte|
|byte|0|1 byte|
|short|0|2 byte|
|int|0|4 byte|
|long|0L|8 byte|
|float|0.0f|4 byte|
|double|0.0d|8 byte|

### Boolean Data Type

The Boolean data type is used to store only two possible values: true and false. This data type is used for simple flags that track true/false conditions.

The Boolean data type specifies one bit of information, but its “size” can’t be defined precisely.

Example: `Boolean one = false`

### Byte Data Type

The byte data type is an example of primitive data type. It isan 8-bit signed two’s complement integer. Its value-range lies between -128 to 127 (inclusive). Its minimum value is -128 and maximum value is 127. Its default value is 0.

The byte data type is used to save memory in large arrays where the memory savings is most required. It saves space because a byte is 4 times smaller than an integer. It can also be used in place of “int” data type.

Example: `byte a = 10, byte b = -20`

### Short Data Type

The short data type is a 16-bit signed two’s complement integer. Its value-range lies between -32,768 to 32,767 (inclusive). Its minimum value is -32,768 and maximum value is 32,767. Its default value is 0.

The short data type can also be used to save memory just like byte data type. A short data type is 2 times smaller than an integer.

Example: `short s = 10000, short r = -5000`

### Int Data Type

The int data type is a 32-bit signed two’s complement integer. Its value-range lies between - 2,147,483,648 (-2^31) to 2,147,483,647 (2^31 -1) (inclusive). Its minimum value is - 2,147,483,648and maximum value is 2,147,483,647. Its default value is 0.

The int data type is generally used as a default data type for integral values unless if there is no problem about memory.

Example: `int a = 100000, int b = -200000`

### Long Data Type

The long data type is a 64-bit two’s complement integer. Its value-range lies between -9,223,372,036,854,775,808(-2^63) to 9,223,372,036,854,775,807(2^63 -1)(inclusive). Its minimum value is - 9,223,372,036,854,775,808and maximum value is 9,223,372,036,854,775,807. Its default value is 0. The long data type is used when you need a range of values more than those provided by int.

Example: `long a = 100000L, long b = -200000L`

### Float Data Type

The float data type is a single-precision 32-bit IEEE 754 floating point.Its value range is unlimited. It is recommended to use a float (instead of double) if you need to save memory in large arrays of floating point numbers. The float data type should never be used for precise values, such as currency. Its default value is 0.0F.

Example: `float f1 = 234.5f`

### Double Data Type

The double data type is a double-precision 64-bit IEEE 754 floating point. Its value range is unlimited. The double data type is generally used for decimal values just like float. The double data type also should never be used for precise values, such as currency. Its default value is 0.0d.

Example: `double d1 = 12.3`

### Char Data Type

The char data type is a single 16-bit Unicode character. Its value-range lies between ‘000’ (or 0) to ‘’ (or 65,535 inclusive).The char data type is used to store characters.

Example: `char letterA = 'A'`

### Why char uses 2 byte in java and what is 000 ?

It is because java uses Unicode system not ASCII code system. The 000 is the lowest range of Unicode system.

## Operators in Java

Operator in Java is a symbol that is used to perform operations. For example: +, -, *, / etc. There are many types of operators in Java which are given below:

- Unary Operator,
- Arithmetic Operator,
- Shift Operator,
- Relational Operator,
- Bitwise Operator,
- Logical Operator,
- Ternary Operator and
- Assignment Operator.

|   |   |   |
|---|---|---|
|Operator Type|Category|Precedence|
|Unary|postfix|expr++ expr–|
||prefix|++expr –expr +expr -expr ~ !|
|Arithmetic|multiplicative|* / %|
||additive|+ -|
|Shift|shift|<< >> >>>|
|Relational|comparison|< > <= >= instanceof|
||equality|== !=|
|Bitwise|bitwise AND|&|
||bitwise exclusive OR|^|
||bitwise inclusive OR||
|Logical|logical AND|&&|
||logical OR||
|Ternary|ternary|? :|
|Assignment|assignment|= += -= *= /= %= &= ^=|

## List of Java Keywords

A list of Java keywords or reserved words are given below:

1. abstract: Java abstract keyword is used to declare an abstract class. An abstract class can provide the implementation of the interface. It can have abstract and non-abstract methods.
2. boolean: Java boolean keyword is used to declare a variable as a boolean type. It can hold True and False values only.
3. break: Java break keyword is used to break the loop or switch statement. It breaks the current flow of the program at specified conditions.
4. byte: Java byte keyword is used to declare a variable that can hold 8-bit data values.
5. case: Java case keyword is used with the switch statements to mark blocks of text.
6. catch: Java catch keyword is used to catch the exceptions generated by try statements. It must be used after the try block only.
7. char: Java char keyword is used to declare a variable that can hold unsigned 16-bit Unicode characters
8. class: Java class keyword is used to declare a class.
9. continue: Java continue keyword is used to continue the loop. It continues the current flow of the program and skips the remaining code at the specified condition.
10. default: Java default keyword is used to specify the default block of code in a switch statement.
11. do: Java do keyword is used in the control statement to declare a loop. It can iterate a part of the program several times.
12. double: Java double keyword is used to declare a variable that can hold 64-bit floating-point number.
13. else: Java else keyword is used to indicate the alternative branches in an if statement.
14. enum: Java enum keyword is used to define a fixed set of constants. Enum constructors are always private or default.
15. extends: Java extends keyword is used to indicate that a class is derived from another class or interface.
16. final: Java final keyword is used to indicate that a variable holds a constant value. It is used with a variable. It is used to restrict the user from updating the value of the variable.
17. finally: Java finally keyword indicates a block of code in a try-catch structure. This block is always executed whether an exception is handled or not.
18. float: Java float keyword is used to declare a variable that can hold a 32-bit floating-point number.
19. for: Java for keyword is used to start a for loop. It is used to execute a set of instructions/functions repeatedly when some condition becomes true. If the number of iteration is fixed, it is recommended to use for loop.
20. if: Java if keyword tests the condition. It executes the if block if the condition is true.
21. implements: Java implements keyword is used to implement an interface.
22. import: Java import keyword makes classes and interfaces available and accessible to the current source code.
23. instanceof: Java instanceof keyword is used to test whether the object is an instance of the specified class or implements an interface.
24. int: Java int keyword is used to declare a variable that can hold a 32-bit signed integer.
25. interface: Java interface keyword is used to declare an interface. It can have only abstract methods.
26. long: Java long keyword is used to declare a variable that can hold a 64-bit integer.
27. native: Java native keyword is used to specify that a method is implemented in native code using JNI (Java Native Interface).
28. new: Java new keyword is used to create new objects.
29. null: Java null keyword is used to indicate that a reference does not refer to anything. It removes the garbage value.
30. package: Java package keyword is used to declare a Java package that includes the classes.
31. private: Java private keyword is an access modifier. It is used to indicate that a method or variable may be accessed only in the class in which it is declared.
32. protected: Java protected keyword is an access modifier. It can be accessible within the package and outside the package but through inheritance only. It can’t be applied with the class.
33. public: Java public keyword is an access modifier. It is used to indicate that an item is accessible anywhere. It has the widest scope among all other modifiers.
34. return: Java return keyword is used to return from a method when its execution is complete.
35. short: Java short keyword is used to declare a variable that can hold a 16-bit integer.
36. static: Java static keyword is used to indicate that a variable or method is a class method. The static keyword in Java is mainly used for memory management.
37. strictfp: Java strictfp is used to restrict the floating-point calculations to ensure portability.
38. super: Java super keyword is a reference variable that is used to refer to parent class objects. It can be used to invoke the immediate parent class method.
39. switch: The Java switch keyword contains a switch statement that executes code based on test value. The switch statement tests the equality of a variable against multiple values.
40. synchronized: Java synchronized keyword is used to specify the critical sections or methods in multithreaded code.
41. this: Java this keyword can be used to refer the current object in a method or constructor.
42. throw: The Java throw keyword is used to explicitly throw an exception. The throw keyword is mainly used to throw custom exceptions. It is followed by an instance.
43. throws: The Java throws keyword is used to declare an exception. Checked exceptions can be propagated with throws.
44. transient: Java transient keyword is used in serialization. If you define any data member as transient, it will not be serialized.
45. try: Java try keyword is used to start a block of code that will be tested for exceptions. The try block must be followed by either catch or finally block.
46. void: Java void keyword is used to specify that a method does not have a return value.
47. volatile: Java volatile keyword is used to indicate that a variable may change asynchronously.
48. while: Java while keyword is used to start a while loop. This loop iterates a part of the program several 48. times. If the number of iteration is not fixed, it is recommended to use the while loop.