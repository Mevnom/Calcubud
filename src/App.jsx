import { useState } from 'react';
import EquationQuizGame from './EquationGenerator';
import HamburgerMenu from "./HamburgerMenu";
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';



function App() {

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}


export default App;
