import logo from './logo.svg';
import './App.css';

function App() {
  const requestOptions = {
    headers: {'Content-Type': 'application/json'}
  }

  fetch('/api/message',requestOptions)
  .then(response => response.json())
  
  .then(data => {
    console.log(data)
  })

  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
