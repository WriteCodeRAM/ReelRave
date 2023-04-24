import {React, useState, useEffect} from "react";
import Slideshow from "./Slideshow";
import axios from "axios";


const Hero = () => {
    const [movies, setMovies] = useState ([
    ])
  
   
    useEffect(() => {
      
      axios
        .get(`
        https://api.themoviedb.org/3/movie/popular?api_key=095e721b09eadf6c12c7599553d2d026&language=en-US&page=1`)
        .then((res) => {
        //   console.log(res.data.results);
          const moviesWithImages = res.data.results.map((movie) => ({
            ...movie,
            image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }));
          setMovies(moviesWithImages);
        });
    }, []);

    
  
    return (
      <div className="hero">
    <h1>Join the <span>ReelRave</span> and <span>Rave</span> about your<br/>favorite movies!</h1>
    <Slideshow movies={movies}/> 
    </div>  
    )
  }

  export default Hero