import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    console.log("tring to create a cookie")
    axios.post("http://localhost:3000/login", {})
    .then(response => {
      console.log(response)
      //localStorage.setItem("somedata", response.data);
    })
  })

  const sendMessage = () => {
    axios.post("http://localhost:3000/testEndpoint", {name:"someNmassesesseawdawdawdawd", likedNumber: 20})
    .then(response => console.log(response))
  }

  const tryProtected = () => {
    axios.get("http://localhost:3000/protected", {})
    .then(response => {
      console.log(response.data)
    })
  }

  return (
    <div>
      <button onClick={sendMessage}>Make an action to server</button>
      <button onClick={tryProtected}>Some protected thing</button>
    </div>
    )
}

export default App;
