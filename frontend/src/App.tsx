import Navbar from './components/Global/Navbar'
import PagesRoutes from './components/Global/PagesRoutes';

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
    <div>
      <Navbar/>
      <div id = 'gap'></div>
      <PagesRoutes/>
    </div>
    
  );
}

export default App;
