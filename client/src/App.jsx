import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarkdownList from './components/MarkdownList';
import CreateMarkdown from './components/CreateMarkdown';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Chart from './components/Chart';
import './chartConfig'



function App() {
  const [markdownList, setMarkdownList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    axios
      .get('https://mymarkdownapp.onrender.com/api/markdown/markdown-list')
      .then((response) => {
        setMarkdownList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Markdown list:', error);
      });
  }, []);



  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={<CreateMarkdown markdownList={markdownList} setMarkdownList={setMarkdownList} />}
          />
          <Route
            path="/list"
            element={<MarkdownList markdownList={markdownList} setMarkdownList={setMarkdownList} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/chart" element={<Chart/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
