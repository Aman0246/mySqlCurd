import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';

function App() {
  return (
<>
<Navbar/>
<Routes>
  <Route path="/signin" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Routes>

</>
  );
}

export default App;
