import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import GeneralPage from './GeneralPage/GeneralPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/generalPage' element={<GeneralPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
