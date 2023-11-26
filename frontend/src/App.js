import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AddTask from './Components/AddTask';
import Update from './Components/Update';

function App() {
  return (
<>
<Navbar/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signin" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/addTask" element={<AddTask />} />
  <Route path="/Update/:id" element={<Update />} />
</Routes>

</>
  );
}

export default App;
