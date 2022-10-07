
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
// import Tablee from './containers/Table';
// import Campaign from './containers/Campaign';
// import axios from "axios";
 
// axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/main' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
