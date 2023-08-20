import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileUpload from './FileUpload';
import AboutPage from './AboutPage';
import KalsoniPage from './KalsoniPage';
import ContactPage from './ContactPage';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => setMessage(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav>
          <Link to="/about">About</Link>
          <Link to="/kalsoni">Kalsoni</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/upload">Upload</Link> {/* Added Upload Link */}
        </nav>
        
        {/* Routes */}
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/kalsoni" element={<KalsoniPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/upload" element={<FileUpload />} /> {/* Added Upload Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


