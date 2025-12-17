Python Interview Questions

WHAT IS INIT?

init is a contructor method in Python and is automatically called to allocate  
memory when a new object/instance is created. All classes have a init method  
associated with them. It helps in distinguishing methods and attributes of a  
class from local variables.

WHAT IS THE DIFFERENCE BETWEEN PYTHON ARRAYS AND LISTS?

- Arrays in python can only contain elements of same data types i.e., data type  
    of array should be homogeneous. It is a thin wrapper around C language arrays  
    and consumes far less memory than lists.
- Lists in python can contain elements of different data types i.e., data type  
    of lists can be heterogeneous. It has the disadvantage of consuming large  
    memory.

WHAT IS DOCSTRING IN PYTHON?

WHAT IS BREAK, CONTINUE AND PASS IN PYTHON

https://www.interviewbit.com/python-interview-questions/  
[https://www.interviewbit.com/python-interview-questions/]

BEGINNER LEVEL

Questions:  
1. What is the difference between list, tuple, and set in Python?  
* Answer: A list is a mutable, ordered collection of elements, while a tuple  
is an immutable, ordered collection. A set is an unordered collection with  
no duplicate elements.  
2. Explain the difference between == and is in Python.  
* Answer: == checks for equality in values, while is checks for identity  
(whether two references point to the same object in memory).  
3. What is a Python dictionary, and how is it different from a list?  
* Answer: A dictionary is an unordered collection of key-value pairs, while  
a list is an ordered sequence of elements. In dictionaries, values are  
accessed by unique keys, whereas lists are accessed by their index  
positions.  
4. How does slicing work in Python? Provide an example.  
* Answer: Slicing lets you retrieve specific sections of a sequence by using  
the syntax sequence[start:end:step]. For example, my_list[1:5:2] retrieves  
every second element between index 1 and 5.  
5. Explain the purpose of the def keyword in Python.  
* Answer: The def keyword is used to define a function. A function is a  
reusable block of code that performs a specific task.

Coding Exercises:  
1. Write a Python program to reverse a string.  
* Input: “hello”  
* Output: “olleh”  
2. Write a program to check if a number is even or odd.  
* Input: 7  
* Output: “Odd”  
3. Write a function that takes a list and returns a new list with unique  
elements only.  
* Input: [1, 2, 2, 3, 4, 4, 5]  
* Output: [1, 2, 3, 4, 5]

---

INTERMEDIATE LEVEL

Questions:  
1. What are list comprehensions, and how do they differ from regular for loops?  
* Answer: List comprehensions provide a concise way to create lists by  
embedding for and if conditions within square brackets. They are faster  
than for loops due to reduced overhead.  
2. What is the difference between @classmethod, @staticmethod, and instance  
methods?  
* Answer: @classmethod modifies a method to receive the class as the first  
argument (cls), @staticmethod is a method that does not receive self or  
cls, and instance methods receive self (an instance of the class) as their  
first argument.  
3. How does exception handling work in Python? Explain try, except, else, and  
finally.  
* Answer: In try, you place the code that might raise an exception. except  
catches the exception if one occurs. else runs if no exception occurs, and  
finally always runs at the end, regardless of an exception.  
4. Explain the concept of decorators in Python and provide an example.  
* Answer: A decorator is a function that modifies another function’s  
behavior. For example:

```Plain
  pythonCopy codedef uppercase_decorator(func):
      def wrapper():
          result = func()
          return result.upper()
      return wrapper
```

1. What is the purpose of init in Python classes?
    - Answer: init is the constructor method in Python classes that initializes  
        new objects. It runs automatically whenever a new object is instantiated.

Coding Exercises:  
1. Write a function that checks if a string is a palindrome.  
* Input: “racecar”  
* Output: True  
2. Write a Python function to generate Fibonacci numbers up to n.  
* Input: 10  
* Output: [0, 1, 1, 2, 3, 5, 8]  
3. Write a function that takes a dictionary and returns a new dictionary with  
keys and values swapped.  
* Input: {“a”: 1, “b”: 2, “c”: 3}  
* Output: {1: “a”, 2: “b”, 3: “c”}

---

EXPERT LEVEL

Questions:  
1. What is the Global Interpreter Lock (GIL) in Python, and how does it affect  
multi-threading?  
* Answer: The GIL is a mutex that protects access to Python objects,  
preventing multiple native threads from executing Python bytecodes at  
once. This limits true parallel execution in multi-threaded Python code  
but does not affect multi-processing.  
2. Explain the difference between deepcopy and copy in Python.  
* Answer: copy creates a shallow copy, duplicating only the references for  
nested objects, while deepcopy creates a full, recursive copy of objects,  
duplicating nested objects as well.  
3. How can you optimize Python code for performance?  
* Answer: Techniques include using list comprehensions instead of loops,  
minimizing global variables, leveraging efficient data structures (e.g.,  
set for unique elements), using built-in functions, and employing  
libraries like NumPy or Cython for computational-heavy tasks.  
4. What is metaclass in Python, and why might it be used?  
* Answer: A metaclass is a class of a class that defines how classes behave.  
You might use it to control class creation, like customizing instance  
creation, enforcing design patterns, or adding class methods.  
5. How does memory management work in Python? Explain garbage collection and  
del.  
* Answer: Python uses reference counting and a cyclic garbage collector to  
manage memory. del is the destructor method that runs when an object is  
garbage-collected, but its use is generally discouraged due to  
unpredictability.

Coding Exercises:  
1. Implement a class-based stack with push, pop, and is_empty methods.  
* Use a list to manage the stack internally and raise an exception if pop is  
called on an empty stack.  
2. Write a Python program that removes duplicate items from a linked list.  
* Input: 1 -> 2 -> 2 -> 3 -> 4 -> 4  
* Output: 1 -> 2 -> 3 -> 4  
3. Write a decorator that limits the number of times a function can be called.  
* For example, if a function has a limit of 3 calls, it should raise an  
exception on the 4th call.

EMAIL CRAWLING, INTEGRATION WITH ALEXA AND GOOGLE HOME, AI CHATBOT

BEGINNER LEVEL

1. What libraries in Python can be used to crawl or access email data?
    - Answer: Libraries like imaplib and smtplib allow for interacting with  
        email servers for retrieving and sending emails. imaplib is used for  
        fetching emails from IMAP servers, and smtplib is used for sending emails  
        via SMTP.
2. What is Natural Language Processing (NLP), and why is it important in  
    chatbot development?
    - Answer: NLP is a field of AI that helps machines understand, interpret,  
        and respond to human language. It’s essential for chatbots to understand  
        user inputs and respond naturally.
3. What is the Alexa Skills Kit, and how does it work?
    - Answer: The Alexa Skills Kit (ASK) is a collection of tools and APIs for  
        building Alexa skills. It allows developers to create voice-enabled  
        applications, where Alexa processes the user’s voice input and triggers  
        custom responses in the skill.

---

INTERMEDIATE LEVEL

1. Explain how you would retrieve the subject lines of unread emails from a  
    Gmail account using Python.
    - Answer: Using imaplib, you can connect to the Gmail server  
        (imap.gmail.com), authenticate, search for unread messages in the inbox  
        with SEARCH UNSEEN, and fetch subject headers from each message.
2. Describe how an Alexa skill or Google Assistant action is structured in  
    terms of intents and slots.
    - Answer: Intents represent the actions users can take, like checking the  
        weather or setting reminders. Slots are variables in intents, allowing  
        Alexa or Google Assistant to extract specific details, like dates or  
        locations, from user inputs.
3. What are some common methods used to preprocess text data for a chatbot?
    - Answer: Common preprocessing techniques include tokenization, lowercasing,  
        removing stop words, stemming, lemmatization, and handling punctuation.  
        These steps help the chatbot interpret text more effectively.
4. Explain how an AI chatbot can use intents and entities to provide accurate  
    responses.
    - Answer: Intents represent the user’s goal (e.g., “Book a flight”), while  
        entities represent specific details (e.g., “New York,” “tomorrow”). By  
        identifying both, a chatbot can respond appropriately based on user  
        requirements.

---

EXPERT LEVEL

1. How can you create an Alexa skill or Google Assistant action that integrates  
    with an external API using Python?
    - Answer: First, define the skill’s intents and slots, then use the ASK SDK  
        (for Alexa) or Dialogflow API (for Google Assistant). In the backend, you  
        can use a Python function hosted on AWS Lambda or a web server that makes  
        API calls to fetch or send data to an external API, returning the response  
        as voice output.
2. What is Dialogflow, and how can it be used to create an AI chatbot?
    - Answer: Dialogflow is a natural language understanding platform by Google  
        for building conversational applications. It uses intents, entities, and  
        contexts to understand user input and can be integrated with various  
        messaging platforms.
3. How would you implement an email crawler that fetches only relevant emails  
    based on keywords in Python?
    - Answer: Using imaplib, you can authenticate with the email server, then  
        use a search query that includes keywords in the subject or body to filter  
        emails. Once the relevant emails are found, you can fetch their content  
        and store them in a database.
4. Explain how Machine Learning can enhance a chatbot’s response accuracy and  
    relevancy.
    - Answer: Machine Learning algorithms can help chatbots learn from past  
        interactions and improve responses over time. Models like LSTM,  
        transformers, and BERT can provide context-aware, dynamic responses,  
        making chatbots more interactive and accurate.
5. How can you enable real-time communication between a chatbot and smart home  
    devices?
    - Answer: Using platforms like Alexa Skills Kit or Google Assistant SDK in  
        Python, you can create custom commands to control smart devices. By  
        sending requests to smart home APIs (e.g., Philips Hue API for lighting),  
        you can create a voice-enabled chatbot that responds to real-time commands  
        to control devices.

---

CODING EXERCISES

1. Create a function that retrieves all unread emails with specific keywords in  
    the subject.
    - Using imaplib and email, write a function that connects to an IMAP server,  
        searches for unread emails, filters by subject keywords, and prints the  
        email content.
2. Write a Python script to process natural language input using a pre-trained  
    model (e.g., BERT) for a chatbot.
    - Implement a simple function that takes user input and returns an output  
        based on a BERT model, pre-trained for intent detection, using libraries  
        like transformers.
3. Build a Python class for a voice assistant skill that integrates with a  
    weather API (like OpenWeatherMap).
    - The class should handle user queries about the weather, retrieve data from  
        OpenWeatherMap, and return formatted responses suitable for voice output.