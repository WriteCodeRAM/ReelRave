import { useState } from 'react'
import './App.css'
import logo from './images/ReelRave.png'
import parasite from './images/parasite.jpeg'
import joker from './images/joker.jpg'
import avengers from './images/infinitywar.jpg'
import wows from './images/wolfofwallstreet.jpg'
import interstellar from './images/interstellar.jpeg'
import tdk from './images/thedarkknight.jpg'
import Slideshow from './Components/Slideshow'
import { useEffect } from 'react'
import axios from 'axios'




const Nav = () => {

  return (
  <nav>
    <div><img className='logo' src={logo} alt="Reel Rave logo" /></div>
    <div className="nav-links">
      <ul>
        <li><a href="">Join Discussion</a></li>
      </ul>
    </div>
  </nav>
  )
}

const Hero = () => {
  const [movies, setMovies] = useState ([
    {image: parasite,  title: 'parasite poster' },
    {image: interstellar,  title: 'interstellar poster' },
    {image: joker,  title: 'joker poster' },
    {image: wows,  title: 'wolf of wall street poster' },
    {image: avengers,  title: 'infinity war poster' },
    {image: tdk,  title: 'the dark knight poster' },
    {image: tdk,  title: 'the dark knight poster' },
    {image: tdk,  title: 'the dark knight poster' },
    {image: tdk,  title: 'the dark knight poster' },
    {image: tdk,  title: 'the dark knight poster' },
    {image: tdk,  title: 'the dark knight poster' },
    {image: tdk,  title: 'the dark knight poster' },
    {image: tdk,  title: 'the dark knight poster' },
    {image: tdk,  title: 'the dark knight poster' },
  ])

  //hide api key 
  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=095e721b09eadf6c12c7599553d2d026&language=en-US&page=1')
    .then((res) =>{
     console.log(res.data.results)
     setMovies(res.data.results)

     console.log(movies)


     
  })

  }, [])

  return (
    <> 
  <h1>Where movie lovers come to <span>rave!</span></h1>
  <Slideshow movies={movies}/> 
    </> 
  )
}


function App() {
  const [count, setCount] = useState(0)

 


  return (
    <div className="App">
      <Nav /> 
    <Hero/> 
    </div>
  )
}

export default App
