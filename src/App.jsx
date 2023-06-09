import './App.css'
import Hero from './Components/Hero'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import Discussion from './Components/Discussion'
import PostForm from './Components/createPost'
import Post from './Components/Post'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {


 


  return (
    <Router>
    <div className="App">
      <Nav /> 
      <Routes>

    <Route path='/' element={<Hero/>} /> 
    <Route path='/home' element={<Hero/>} /> 
    <Route path='/discussion' element={<Discussion/>} /> 
    <Route path='/discussion/:id' element={<Post/>} /> 
    <Route path='/create-post' element={<PostForm/>} /> 
  

      </Routes>
    </div>

      <Footer/>
    </Router>
  )
}

export default App
