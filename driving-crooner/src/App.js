import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import JobApplication from './pages/JobApplication';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/job-application" element={<JobApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
