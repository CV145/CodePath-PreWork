import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import supabase from './client';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreator from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import ShowCreators from './pages/ShowCreators';
import Home from './pages/Home';
import './App.css';
import '@picocss/pico';

function App() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase
        .from('creators')
        .select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCreators(data);
      }
    }
    fetchCreators();
  }, []);

  return (
    <Router>
      <div>
        <header className="container-fluid">
          <nav className="container">
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
        </header>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-creator" element={<AddCreator />} />
            <Route path="/edit-creator/:id" element={<EditCreator />} />
            <Route path="/view-creator/:id" element={<ViewCreator creators={creators} />} />
            <Route path="/show-creators" element={<ShowCreators creators={creators} setCreators={setCreators} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
