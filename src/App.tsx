import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;