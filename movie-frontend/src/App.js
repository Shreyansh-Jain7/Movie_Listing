import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} /> 
        <Route path="/" component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
