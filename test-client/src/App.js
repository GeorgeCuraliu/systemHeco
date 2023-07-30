import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const sendMessage = () => {
    axios.post("http://localhost:3000/testEndpoint", {name:"someNmassesesseawdawdawdawd", likedNumber: 20})
    .then(response => console.log(response))
  }

  return (
    <div>
      <button onClick={sendMessage}>Make an action to server</button>
    </div>
    )
}

export default App;
