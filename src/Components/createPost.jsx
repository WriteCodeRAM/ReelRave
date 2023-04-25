import {React , useState} from "react";
import { supabase } from "../client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const PostForm = () => {
    
    const [username, setUsername] = useState('')
    const [movie, setMovie] = useState('')
    const [ravingTitle, setRavingTitle] = useState('')
    const [content, setContent] = useState('');
    const [spoiler, setSpoiler] = useState(false)


    const handleSubmit = async (e) => {

        e.preventDefault() 
        console.log(username, movie, ravingTitle, content)

        await supabase.from('Posts').insert({author: username, title:ravingTitle, post: content, movie: movie, spoiler: spoiler}).select()

        window.location = "/discussion"
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
        // console.log(`username: ${username}`)
    }
    const handleMovie = (e) => {
        setMovie(e.target.value)
        // console.log(`Movie: ${movie}`)
    }
    const handleRavingTitle = (e) => {
        setRavingTitle(e.target.value)
        // console.log(`Raving Title: ${ravingTitle}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="label-container">

            <div className="username-input">
        <label htmlFor="username">Username:</label>
        <input type="text" value={username} onChange={handleUsername} id="username" name="username" />
            </div>

<div className="movie-input">
        <label htmlFor="title">Movie name:</label>
        <input type="text" value={movie} onChange={handleMovie} id="title" name="title" />
</div>

<div className="spoiler-input">
<label>
    Contains Spoiler?
    <input
      type="radio"
      value="true"
      checked={spoiler}
      onChange={() => setSpoiler(true)}
    />
    Yes
  </label>
  <label>
    <input
      type="radio"
      value="false"
      checked={!spoiler}
      onChange={() => setSpoiler(false)}
    />
    No
  </label>
</div>
<div className="rave-title">

        <label htmlFor="raving">Raving title:</label>
        <input type="text" value={ravingTitle} onChange={handleRavingTitle } id="raving" name="raving" />
</div>
            </div>
  
        <label htmlFor="raving">Raving:</label>
        <ReactQuill
          id="raving"
          name="raving"
          value={content}
          onChange={setContent}
        />
  
        <button type="submit">Submit</button>
      </form>
    )
}



export default PostForm