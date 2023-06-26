import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './components/Cart';
import JobApplication from './pages/JobApplication';

function App() {
  const [cigar, setCigar] = useState(0)
  const [fedora, setFedora] = useState(0)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobapplication" element={<JobApplication />} />
        <Route
          path="/shop"
          element={<Shop cigar={cigar} setCigar={setCigar} fedora={fedora} setFedora={setFedora} />}
        />
        <Route
          path="/cart"
          element={<Cart cigar={cigar} setCigar={setCigar} fedora={fedora} setFedora={setFedora} />}
        />
      </Routes>
    </Router>
  );
}

export default App;