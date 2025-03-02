import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import CreatePost from './Pages/CreatePost';
import Home from './Pages/HomePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
