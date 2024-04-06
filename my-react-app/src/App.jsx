import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import RecipeCreate from './pages/RecipeCreate';
import RecipePost from './pages/RecipePost';
import Navbar from './components/Navbar';
import Post from './pages/Post';
import Message from './pages/Message';
import Favorite from './pages/Favorite';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RecipeCreate" element={<RecipeCreate />} />
          <Route path="/RecipePost" element={<RecipePost />} />
          <Route path="/recipeDetail/:id" element={<RecipeDetail />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/Favorite" element={<Favorite />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
