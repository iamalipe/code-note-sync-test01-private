Interview Questions  
Project info and feature  
webrtc, socket, realtime, payment, chat, email, sms and push notification  
AI and Bot Agent - Dilogflow Google  
Firebase  
React  
useCallback and useMemo  
hook, custom hook, hoc, props driling  
redux  
login page code  
css mui, tailwind, style library  
express, orm, middleware  
rate limiter  
auth system  
server management  
RBAC  & ABAC
how to handle image, video, attachment upload  
AWS - S3 - EC2

https://jsonplaceholder.typicode.com/posts  
https://picsum.photos/1000/600

https://dummyimage.com/600x400/000/fff.jpg&text=img01  
https://dummyimage.com/600x400/000/fff.jpg&text=img02  
https://dummyimage.com/600x400/000/fff.jpg&text=img03  
https://dummyimage.com/600x400/000/fff.jpg&text=img04

TASK  
Easy

Simple Login page (email, password), submit to print value into console  
Reverse a number/string in text field  
Mid

Call a Child Function from Parent  
Display API (jsonplaceholder) data in a table  
Add a pagination into it  
Hard

Image Carousel  
Todo List with Local Storage  
Render a Folder Tree

```js
const folders = [
  {
    name: "Folder 1",
    sub: [],
  },
  {
    name: "Folder 2",
    sub: [],
  },
  {
    name: "Folder 2",
    sub: [
      {
        name: "Folder 2 sub 1",
        sub: [],
      },
      {
        name: "Folder 2 sub 2",
        sub: [],
      },
    ],
  },
];
```

TODO call child increase, decrease from parent

```JavaScript
import { useState } from "react";
import "./styles.css";

// TODO call child increase,decrease function from parent
export default function App() {
  return (
    <>
      <div className="App">
        <h1>This is Parent</h1>
        <button>Parent:Increase</button>
        <button>Parent:Decrease</button>
      </div>
      <Child />
    </>
  );
}

function Child() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((p) => p + 1);
  };
  const decrease = () => {
    setCount((p) => p - 1);
  };

  return (
    <div className="App">
      <h1>This is Child {count}</h1>
      <button onClick={increase}>Child:Increase</button>
      <button onClick={decrease}>Child:Decrease</button>
    </div>
  );
}

// working code
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import "./styles.css";

// App (Parent)
export default function App() {
  const childRef = useRef();

  return (
    <>
      <div className="App">
        <h1>This is Parent</h1>
        <button onClick={() => childRef.current.increase()}>Parent:Increase</button>
        <button onClick={() => childRef.current.decrease()}>Parent:Decrease</button>
      </div>
      <Child ref={childRef} />
    </>
  );
}

// Child (using forwardRef)
const Child = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);

  const increase = () => setCount((p) => p + 1);
  const decrease = () => setCount((p) => p - 1);

  // Expose functions to parent
  useImperativeHandle(ref, () => ({
    increase,
    decrease
  }));

  return (
    <div className="App">
      <h1>This is Child {count}</h1>
      <button onClick={increase}>Child:Increase</button>
      <button onClick={decrease}>Child:Decrease</button>
    </div>
  );
});
```

what is forwardRef, useId

useLayoutEffect vs useEffect  
  

[[Frontend and Backend Interview Q&A]]

  

  

  

  

Noor 5+ y exp  
Noor html 9/10  
Noor css 7/10  
Noor react 7/10  
Noor express/nodejs 7/10

Hemant html 8/10  
Hemant css 8/10  
Hemant react 8/10  
Hemant express/nodejs 8/10

20/03/2025  
Divyan html 9/10  
Divyan css 9/10  
Divyan react 8.5/10  
Divyan express/nodejs 9/10  
Divyan mongodb 8/10

Nikhil
html 8/10  
css 7/10  
react 8/10  
express/nodejs 9/10  
mongodb 9/10
Server menegement 8/10

AI interview  
1. Chat modal to create subscription, events, etc.  
2. Email carwiling to create subscription.  
3. Custom LLM to chat and create subbscription.  
4. intergration with Google and Amazon alexa  
5. AWS textract custom modal or custom modal for receapt and invoice scan.  
6. Audio and Video Chat AI modal.  
7. How to deployment, where to deployment, how much time it take to build.  
8. How to feed data from our data.

  

  

  

jay 7+ y exp  
jay html 8/10  
jay css 7/10  
jay react 9/10  
jay express/nodejs 7/10

jay Python 7/10

  

  

  

[https://gist.github.com/abhiseck-safalvir/909570a898822900c4467b5ef34ff72a](https://gist.github.com/abhiseck-safalvir/909570a898822900c4467b5ef34ff72a)