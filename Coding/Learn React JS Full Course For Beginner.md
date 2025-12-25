# Learn React JS Full Course For Beginner.

# Why React?

- Virtual DOM
- Reusable Web Components
- Maintained by Facebook
- Hirable

# React DOM & JSX

```JavaScript
//index.js => Main React Scriptimport React from "react"import ReactDOM from "react-dom"ReactDOM.render("What do i want to render","Whare i want to render") //JSXReactDOM.render(<h1>Hello World</h1>, document.getElementById("root"))
ReactDOM.render(<h1>Hello World</h1><p>Hello React</p>, document.getElementById("root"))
//Can't Be Use Two TagReactDOM.render(<div><h1>Hello World</h1><p>Hello React</p></div>, document.getElementById("root"))
//Can use inside a DIV Tag
```

## React DOM & JSX Practice

Objective: Fill in the boilerplate React Code required to render an unordered list (`<ul>`) to the page. The a list should contain 3 list items (`<li>`) with anything in then you want.

**HINTS: import the libraries you need first use on of the libraries to render some JSX to the page.**

```JavaScript
import React from "react"import ReactDOM from "react-dom"ReactDOM.render(
    <ul>        <li>Python</li>        <li>Java</li>        <li>JavaScript</li>    </ul>,    document.getElementById("root")
)
```

# Functional Components

```JavaScript
import React from "react"import ReactDOM from "react-dom"function MyApp(){
    return ( // return single HTML Tag        <ul>            <li>Python</li>            <li>Java</li>            <li>JavaScript</li>        </ul>    )
}
ReactDOM.render(
    <MyApp />,    document.getElementById("root")
)
```

## Functional Components Practice

**Objectives:**

1. Set up the basic React code from scratch
2. Create a functional component called MyInfo that return the following UI:
    1. A H1 with your name
    2. A paragraph with a little blurb about yourself
    3. An ordered or unordered list of the top 3 programming language you like
3. Render an instance of that functional component to the browser

```JavaScript
import React from "react"import ReactDOM from "react-dom"function MyInfo(){
    return (
        <div>            <h1>Alipe Reeds</h1>            <p>I'm a Cool LIttle boy</p>            <ul>                <li>JAVA</li>                <li>Python</li>                <li>C & C++</li>            </ul>        </div>    )
}
ReactDOM.render(
    <MyInfo />,    document.getElementById("root")
)
```

# Move Components into Separate Files

```JavaScript
//MyInfo.jsimport React from "react"function MyInfo(){
    return (
        <div>            <h1>Alipe Reeds</h1>            <p>I'm a Cool LIttle boy</p>            <ul>                <li>JAVA</li>                <li>Python</li>                <li>C & C++</li>            </ul>        </div>    )
}
export default MyInfo // export is ES6 features
```

```JavaScript
//index.jsimport React from "react"import ReactDOM from "react-dom"import MyInfo from "./MyInfo" // Don't Need .JS extenctionReactDOM.render(
    <MyInfo />,    document.getElementById("root")
)
```

# Parent/Child Components

```JavaScript
//App.jsimport React from "react"import Footer from "./Footer"import Header from "./Header"import MainContant from "./MainContant"function App(){
    return (
        <div>            <Header />            <MianContent />            <Footer />        </div>    )
}
```

```JavaScript
//index.jsimport React from "react"import ReactDOM from "react-dom"import MyInfo from "./App"ReactDOM.render(
    <App />,    document.getElementById("root")
)
```

# Todo App - Phase 1

From Scratch, initialize the React App, Render an component, Create the component from scratch, Have the component render 3 or 4 checkboxes with paragraphs or spans next to it, like you’re making a todo list with some hard-coded items on it.

```JavaScript
//index.jsimport React from "react"import ReactDOM from "react-dom"import MyInfo from "./App"ReactDOM.render(
    <App />,    document.getElementById("root")
)
```

```JavaScript
import React from "react";// import Header from "./components/header";function App() {
  return (
    <div>      <h1>Todo List</h1>      <p>        Sint eu ipsum ex consequat voluptate pariatur Lorem consequat non aliqua
        tempor. Ut amet eu in consectetur qui non qui aute dolore culpa
        cupidatat. Nisi ullamco commodo aliqua duis ex laborum reprehenderit.
      </p>      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />      <label for="vehicle1">Java</label>      <br />      <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />      <label for="vehicle2">Python</label>      <br />      <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />      <label for="vehicle3">Javasript</label>      <br />    </div>  );}
export default App;
```

# Styling React with CSS Classes

```JavaScript
//Header.jsimport React from "react";import "./Header.css";function Header() {
  return <h2 className="Header-h1">This is Header</h2>;}
export default Header;
```

```CSS
/* Header.css */.Header-h1 {
  background-color: blueviolet;}
```

# ~~Some Caveats~~

# JSX to JavaScript and Back

```JavaScript
import React from "react";function MyInfo() {
  const firstname = "Alipe";  const lastname = "Reeds";  //   {`${firstname} ${lastname}`} This is ES6  return (
    <div>      <h1>Hello {firstname + " " + lastname}</h1>      <h1>Hello {`${firstname} ${lastname}`}</h1>      <p>        Dolore aute duis pariatur id culpa ipsum nostrud proident non culpa qui
        pariatur fugiat.
      </p>      <ul>        <li>Python</li>        <li>Java</li>        <li>C Programming</li>      </ul>    </div>  );}
export default MyInfo;
```

# Inline Styles with the Style Property

```JavaScript
import React from "react";const styles = {
  color: "red",  backgroundColor: "blue",};function Footer() {
  return <h3 style={styles}>This is a Footer</h3>;}
export default Footer;
```

# Todo App - Phase 2

```JavaScript
// TodoApp.jsimport React from "react";import TodoItems from "./TodoItems";function TodoApp() {
  return (
    <div>      <h1>Todo List</h1>      <p>        Sint eu ipsum ex consequat voluptate pariatur Lorem consequat non aliqua
        tempor. Ut amet eu in consectetur qui non qui aute dolore culpa
        cupidatat. Nisi ullamco commodo aliqua duis ex laborum reprehenderit.
      </p>      <TodoItems />      <TodoItems />      <TodoItems />    </div>  );}
export default TodoApp;
```

```JavaScript
// TodoItemsimport React from "react";function TodoItems() {
  return (
    <div>      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />      <label for="vehicle1">Java</label>    </div>  );}
export default TodoItems;
```

# Props Part 1 - Understanding the Concept

# Props Part 2 - Reusable Components

# Props in React

```JavaScript
// TodoItemsimport React from "react";function TodoItems(props) {
  return (
    <div>      <input type="checkbox" id={props.name} value={props.name} />      <label for={props.name}>{props.name}</label>    </div>  );}
export default TodoItems;
```

```JavaScript
// TodoAppimport React from "react";import TodoItems from "./TodoItems";function TodoApp() {
  return (
    <div>      <h1>Todo List</h1>      <p>        Sint eu ipsum ex consequat voluptate pariatur Lorem consequat non aliqua
        tempor. Ut amet eu in consectetur qui non qui aute dolore culpa
        cupidatat. Nisi ullamco commodo aliqua duis ex laborum reprehenderit.
      </p>      <TodoItems name="Java" />      <TodoItems name="Python" />      <TodoItems name="C Programming" />    </div>  );}
export default TodoApp;
```

# Props and Styling Practice

One Last time in this course, set up a React app from scratch Render an component App should be in its own file. App should render 5 component. Each Joke should receive a ” question” prop and a “punchline” prop and render those however you’d like.

**EXTRA CREDIT:**

Some Jokes are inly a punch line with no question:

E. g. : “It’s hard to explain pins to kleptomaniacs because they always take things literally.”

If you don’t pass in a “question” prop, how might you make it only show the punchline instead?

Spend time practicing the style of your Joke component.

```JavaScript
// index.jsimport React from "react";import ReactDOM from "react-dom";import App from "./App"ReactDOM.render(<App />, document.getElementById("root"))
```

```JavaScript
// App.jsimport React from "react"import Joke from "./Joke"function App(){
    return(
        <div>            <Joke question="QUE 1" punchline="ANS 1" />            <Joke question="QUE 1" punchline="ANS 1" />            <Joke question="QUE 1" punchline="ANS 1" />            <Joke question="QUE 1" punchline="ANS 1" />            <Joke question="QUE 1" punchline="ANS 1" />        </div>    )
}
export default App;
```

```JavaScript
// Joke.jsimport React from "react"function Joke(props){
    return (
        <div>            <h1>Question: {props.question}</h1>            <h2>Answar: {props.punchline}</h2>        </div>    )
}
export default Joke;
```

# Mapping Components

```JavaScript
// App.jsimport Joke from "./Joke"import jokesData from "./jokesData"function App(){
    const jokeComponents = jokesData.map(joke => <Joke key={joke.id} question={joke.question}    punchline={joke.punchline} />)
    return (
        <div>            {jokesComponents}        </div>    )
}
export default App;
```

# Todo App - Phase 3

# Class-Based Components

```JavaScript
// App.jsimport React from "react"// function App(){//  return (//      <div>//          <h1>Code goes here</h1>//      </div>//  )// }class App extends React.Component {
    yourMethodHere(){
    }
    render(){
        return (
            <div>                <h1>Code goes here</h1>            </div>        )
    }
}
export default App
```

# State

```JavaScript
//  App.jsimport React from "react"class App extends React.Component{
    constructor(){
        super();        this.state = {
            answer: "Yes"        }
    }
    render(){
        return (
            <div>                <h1>Is state importent to know? {this.state.answer}</h1>                <ChildCompnent answer={this.state.answer} />            </div>        )
    }
}
export default App
```

# State Practice

**Challenge:** Given an incomplete class-based component without a constructor, add a constructor and initialize state to fix the broken component.

```JavaScript
import React from "react"class App extends Component(){
    return(
        <div>            <h1>{this.state.name}</h1>            <h3>{this.state.age}</h3>        </div>    )
}
export default App
```

## FIX

```JavaScript
import React from "react"export default class App extends React.Component {
    constructor(){
        super();        this.state = {
            name: "Alipe",            age: 22        }
    }
    render(){
        return(
            <div>                <h1>{this.state.name}</h1>                <h3>{this.state.age}</h3>            </div>        )
    }
}
```

# State Practice 2

Given a stateless functional component, add state to it. state should have a property called `isLoggedIn` which is a boolean (true if logged in, false if not)

Then, give your best shot at rendering the word “IN” if the user is logged in or “OUT” if the user is logged out.

```JavaScript
import React from "react"function App(){
    return (
        <div>            <h1>You are currently logged (IN/OUT)</h1>        </div>    )
}
export default App
```

## FIX

```JavaScript
import React from "react"export default class App extends React.Component {
    constructor(){
        super();        this.state = {
            isLoggedIn: true        }
    }
    render(){
        let wordDisplay = this.state.isLoggedIn?"IN":"OUT"        return (
            <div>                <h1>You are currently logged {wordDisplay}</h1>            </div>        )
    }
}
```

# Todo App - Phase 4

# Handling Events in React

```JavaScript
import React from "react"function handleClick(){
    console.log("I was Clicked")
}
export default function App(){
    return (
        <div>            <img src="#" />            <br />            <button onClick={handleClick}>Click Me</button>            <button onClick={()=> {console.log("I was Clicked")}}>Click Me</button>        </div>    )
}
```

# Todo App - Phase 5

# Changing State

```JavaScript
import React from "react"export default class App extends React.Component{
    constructor(){
        super();        this.state = {
            count: 0        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        // this.setState({count: 1})        this.setState(prevState => {
            return {
                count: prevState.count + 1            }
        })
    }
    render(){
        return(
            <div>                <h1>{this.state.count}</h1>                <button onClick={this.handleClick}>Change!</button>            </div>        )
    }
}
```

# Todo App - Phase 6

# Lifecycle Methods Part 1

```JavaScript
import React from "react";export default class LifecycleMethodPart1 extends React.Component {
  constructor() {
    super();    this.state = {};  }
  componentDidMount() {
    console.log("GET the data i need to correctly display");    console.log("This Method Mainly use in API call");  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.whatever !== this.props.whatever) {
      console.log("Do something important here");    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // return true if want it to update    // return false if not  }
  componentWillUnmount() {
    // teardown or cleanup your code before your component disappears    // remove event listener  }
  render() {
    return <div>Code Goes here</div>;  }
}
```

# Lifecycle Method Part 2

```JavaScript
import React from "react";export default class LifecycleMethodPart2 extends React.Component {
  constructor() {
    super();    this.state = {};  }
    static getDerivedStateFromProps(props, state){
            console.log("return the now, updated state based upon the props");    }
    getSnapshotBeforeUpdate(){
        console.log("create a backup of the current way things are");    }
  componentDidMount() {
    console.log("GET the data i need to correctly display");    console.log("This Method Mainly use in API call");  }
  render() {
    return <div>Code Goes here</div>;  }
}
```

# Conditional Rendering

# Conditional Rendering Part 2

# Conditional Rendering Practice

# Todo App - Phase 7

# Fetcing Data from an API

```JavaScript
import React from "react"export default class App extends Component{
    constructor(){
        super()
        this.state = {
            loading: false,            character: {}
        }
    }
    componentDidMount(){
        this.setState({loading: true})
        fatch("URL")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cheracter: data,                    loading: false                })
            })
    }
    render(){
        return(
            <div>{this.state.character.name}</div>        )
    }
}
```

# Forms Part 1

```JavaScript
// FormPart1.jsximport React from "react";export default class FormPart1 extends React.Component {
  constructor() {
    super();    this.state = {
      firstName: "",      lastName: "",    };    this.handleChange = this.handleChange.bind(this);  }
  handleChange(event) {
    const { name, value } = event.target;    this.setState({
      [name]: value,      //   [event.target.name]: event.target.value,    });  }
  render() {
    return (
      <form>        <input          type="text"          name="firstName"          value={this.state.firstName}          placeholder="First Name"          onChange={this.handleChange}        />        <br />        <input          type="text"          name="lastName"          value={this.state.lastName}          placeholder="Last Name"          onChange={this.handleChange}        />        <h1>          {this.state.firstName} {this.state.lastName}        </h1>      </form>    );  }
}
```

# Forms Part 2

```JavaScript
// FormPart2import React from "react";export default class FormPart2 extends React.Component {
  constructor() {
    super();    this.state = {
      firstName: "",      lastName: "",      bio: "",      isFrirndly: false,      gender: "",      fevColor: "",    };    this.handleChange = this.handleChange.bind(this);  }
  handleChange(event) {
    const { name, value, type, checked } = event.target;    type === "checkbox"      ? this.setState({
          [name]: checked,        })
      : this.setState({
          [name]: value,        });    // this.setState({    //   [name]: value,    //   //   [event.target.name]: event.target.value,    // });  }
  render() {
    return (
      <form>        <input          type="text"          name="firstName"          value={this.state.firstName}          placeholder="First Name"          onChange={this.handleChange}        />        <br />        <input          type="text"          name="lastName"          value={this.state.lastName}          placeholder="Last Name"          onChange={this.handleChange}        />        <br />        <textarea          type="text"          name="bio"          value={this.state.bio}          placeholder="bio"          onChange={this.handleChange}        />        <br />        <label>          <input            type="checkbox"            name="isFrirndly"            checked={this.state.isFrirndly}            onChange={this.handleChange}          />          Is friendly?
        </label>        <br />        <label>          <input            type="radio"            name="gender"            value="male"            checked={this.state.gender === "male"}            onChange={this.handleChange}          />          Male
        </label>        <br />        <label>          <input            type="radio"            name="gender"            value="female"            checked={this.state.gender === "female"}            onChange={this.handleChange}          />          Female
        </label>        <br />        <label>Favorite Color: </label>        <select          value={this.state.fevColor}          onChange={this.handleChange}          name="fevColor"        >          <option value="blue">Blue</option>          <option value="red">Red</option>          <option value="green">Green</option>          <option value="orange">Orange</option>          <option value="yellow">Yellow</option>        </select>        {/* Display Area */}        <h1>          {this.state.firstName} {this.state.lastName}        </h1>        <p>{this.state.bio}</p>        <h3>          {this.state.isFrirndly === true            ? "isFriendly: True"            : "isFriendly: False"}        </h3>        <h3>You are a {this.state.gender}</h3>        <h3>Your Fevorite Color is {this.state.fevColor}</h3>      </form>    );  }
}
```

# Forms Practice

**Challenge:** Wire up the partially-finished travel form so that it works!

Remember to use the concept of controlled forms.

All information should be populating the text below the form in real-time as you’re filling it out.

```JavaScript
import React from "react"class App extends React.Component{
    constructor(){
        super()
        this.state = {}
    }
    render(){
        return(
        <main>            <form>                <input placeholder="First Name" /><br />                <input placeholder="Last Name" /><br />                <input placeholder="Age" /><br />                {/* Create radio buttons for gender here */}                <br />                {/* Create select box for location here */}            </form>        </main>        )
    }
}
```

### FIX

```JavaScript
import React from "react";export default class FormPractice extends React.Component {
  constructor() {
    super();    this.state = {
      firstName: "",      lastName: "",      age: "",      gender: "",      location: "",    };    this.handleChange = this.handleChange.bind(this);  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,    });  }
  render() {
    return (
      <main>        <form>          <input            type="text"            name="firstName"            value={this.state.firstName}            placeholder="First Name"            onChange={this.handleChange}          />          <br />          <input            type="text"            name="lastName"            value={this.state.lastName}            placeholder="Last Name"            onChange={this.handleChange}          />          <br />          <input            type="number"            name="age"            value={this.state.age}            placeholder="Age"            onChange={this.handleChange}          />          <br />          {/* Create radio buttons for gender here */}          <label>            Male
            <input              type="radio"              name="gender"              value="male"              checked={this.state.gender === "male"}              onChange={this.handleChange}            />          </label>          <br />          <label>            Female
            <input              type="radio"              name="gender"              value="female"              checked={this.state.gender === "female"}              onChange={this.handleChange}            />          </label>          <br />          {/* Create select box for location here */}          <select            name="location"            value={this.state.location}            onChange={this.handleChange}          >            <option value="kolkata">Kolkata</option>            <option value="pune">Pune</option>            <option value="delhi">Delhi</option>          </select>          <br />          <p>            {this.state.firstName} {this.state.lastName} {this.state.age}{" "}            {this.state.gender} {this.state.location}          </p>        </form>      </main>    );  }
}
```

# Container/Component Architecture

```JavaScript
// App.jsximport React from "react";import FormComponent from "./FormComponent";export default class App extends React.Component {
  render() {
    return <FormComponent />;  }
}
```

```JavaScript
// FormContainer.jsximport React from "react";import FormContainer from "./FormContainer";export default class FormComponent extends React.Component {
  constructor() {
    super();    this.state = {
      firstName: "",      lastName: "",      age: "",      gender: "",      location: "",    };    this.handleChange = this.handleChange.bind(this);  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,    });  }
  render() {
    return (
      <FormContainer        handleChange={this.handleChange}        data={this.state}      />    );  }
}
```

```JavaScript
// FormContainer.jsximport React from "react";export default function FormContainer(props) {
  return (
    <main>      <form>        <input          type="text"          name="firstName"          value={props.data.firstName}          placeholder="First Name"          onChange={props.handleChange}        />        <br />        <input          type="text"          name="lastName"          value={props.data.lastName}          placeholder="Last Name"          onChange={props.handleChange}        />        <br />        <input          type="number"          name="age"          value={props.data.age}          placeholder="Age"          onChange={props.handleChange}        />        <br />        {/* Create radio buttons for gender here */}        <label>          Male
          <input            type="radio"            name="gender"            value="male"            checked={props.data.gender === "male"}            onChange={props.handleChange}          />        </label>        <br />        <label>          Female
          <input            type="radio"            name="gender"            value="female"            checked={props.data.gender === "female"}            onChange={props.handleChange}          />        </label>        <br />        {/* Create select box for location here */}        <select          name="location"          value={props.data.location}          onChange={props.handleChange}        >          <option value="kolkata">Kolkata</option>          <option value="pune">Pune</option>          <option value="delhi">Delhi</option>        </select>        <br />        <p>          {props.data.firstName} {props.data.lastName} {props.data.age}{" "}          {props.data.gender} {props.data.location}        </p>      </form>    </main>  );}
```

# Meme Generator Capstone Project

# Writing Modern React Apps

```JavaScript
handleChange(event){
    this.setState({
        // Something    })
}
// Chnage This to Arrow Funtion// Arrow Funtion don't need to bindhandleChange = (event) => {
    this.setState({
        // Something    })
}
```

```JavaScript
// Don't use this.state in constructer methodstate = {
    // Something}
```

# The End

## Alipe Reeds