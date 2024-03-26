import './App.css';
import { Link, Outlet } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Link to="/hi">Hi page!</Link>
      <Outlet />
    </div>
  );
}

export default App;
