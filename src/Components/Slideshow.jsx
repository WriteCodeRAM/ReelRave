import {React, useEffect, useState, useRef} from "react";


const MovieCard = ({image, title}) => {
    return (
      <div className="movie-card">
        <img src={image} alt={title} />
      </div>
    );
  }
  

  function Slideshow({ movies }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideshowRef = useRef(null);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % movies.length);
        console.log(currentIndex)
      }, 3000);
  
      return () => clearInterval(interval);
    }, [currentIndex, movies.length]);

    useEffect(() => {
        if (slideshowRef.current) {
          slideshowRef.current.scrollLeft = currentIndex * slideshowRef.current.offsetWidth;
        }
      }, [currentIndex]);
  
    return (
      <div className="slideshow" ref={slideshowRef}>
        {movies.map((movie, index) => (
          <MovieCard
            key={index}

            image={movie.image}
            title={movie.title}
            isActive={index === currentIndex}
          />
        ))}
      </div>
    );
  }
  
  export default Slideshow