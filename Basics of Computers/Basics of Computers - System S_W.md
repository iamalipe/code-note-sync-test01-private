Basics of Computers - System S_W

# Basics of Computers - System S/W

As you know, system software acts as an interface for the underlying hardware system. Here we will discuss some important system software in detail.

[![](https://i.imgur.com/CON0Xv4.jpg)](https://i.imgur.com/CON0Xv4.jpg)

## Operating System

**Operating system (OS)** is the lifeline of computer. You connect all the basic devices like CPU, monitor, keyboard and mouse; plug in the power supply and switch it on thinking you have everything in place. But the computer will not start or come to life unless it has an operating system installed in it because OS −

- Keeps all hardware parts in a state of readiness to follow user instructions
- Co-ordinates between different devices
- Schedules multiple tasks as per priority
- Allocates resource to each task
- Enables computer to access network
- Enables users to access and use application software

Besides initial booting, these are some of the functions of an operating system −

- Managing computer resources like hardware, software, shared resources, etc.
- Allocating resources
- Prevent error during software use
- Control improper use of computer

One of the earliest operating systems was **MS-DOS,** developed by Microsoft for IBM PC. It was a **Command Line Interface (CLI)** OS that revolutionized the PC market. DOS was difficult to use because of its interface. The users needed to remember instructions to do their tasks. To make computers more accessible and user-friendly, Microsoft developed **Graphical User Interface (GUI)** based OS called **Windows**, which transformed the way people used computers.

## Assembler

Assembler is a system software that converts assembly level programs to machine level code.

[![](https://i.imgur.com/CCTQJeR.jpg)](https://i.imgur.com/CCTQJeR.jpg)

These are the advantages provided by assembly level programming −

- Increases efficiency of the programmer as remembering mnemonics is easier
- Productivity increases as number of errors decreases and hence debugging time
- Programmer has access to hardware resources and hence has flexibility in writing programs customized to the specific computer

## Interpreter

The major advantage of assembly level language was its ability to optimize memory usage and hardware utilization. However, with technological advancements computers had more memory and better hardware components. So ease of writing programs became more important than optimizing memory and other hardware resources.

In addition, a need was felt to take programming out of a handful of trained scientists and computer programmers, so that computers could be used in more areas. This led to development of high level languages that were easy to understand due to resemblance of commands to English language.

The system software used to translate high level language source code into machine level language object code line by line is called an **interpreter**. An interpreter takes each line of code and converts it into machine code and stores it into the object file.

The **advantage** of using an interpreter is that they are very easy to write and they do not require a large memory space. However, there is a major disadvantage in using interpreters, i.e., interpreted programs take a long time in executing. To overcome this **disadvantage**, especially for large programs, **compilers** were developed.

## Compiler

System software that store the complete program, scan it, translate the complete program into object code and then creates an executable code is called a compiler. On the face of it compilers compare unfavorably with interpreters because they −

- are more complex than interpreters
- need more memory space
- take more time in compiling source code

However, compiled programs execute very fast on computers. The following image shows the step-by-step process of how a source code is transformed into an executable code −

[![](https://i.imgur.com/3JlQT6X.jpg)](https://i.imgur.com/3JlQT6X.jpg)

These are the steps in compiling source code into executable code −

- **Pre-processing** − In this stage pre-processor instructions, typically used by languages like C and C++ are interpreted, i.e. converted to assembly level language.
- **Lexical analysis** − Here all instructions are converted to **lexical units** like constants, variables, arithmetic symbols, etc.
- **Parsing** − Here all instructions are checked to see if they conform to **grammar rules** of the language. If there are errors, compiler will ask you to fix them before you can proceed.
- **Compiling** − At this stage the source code is converted into **object code**.
- **Linking** − If there are any links to external files or libraries, addresses of their executable will be added to the program. Also, if the code needs to be rearranged for actual execution, they will be rearranged. The final output is the **executable code** that is ready to be executed.