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
    const [secret, setSecret] = useState('')


    const handleSubmit = async (e) => {

        e.preventDefault() 
       

        await supabase.from('Posts').insert({author: username, title:ravingTitle, post: content, movie: movie, spoiler: spoiler, secretkey: secret}).select()

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

    const handleSecret = (e) => {
        setSecret(e.target.value);
      };

    return (
        <form onSubmit={handleSubmit}>
      

          
            <div className="label-container">

            <div className="username-input">
        <label htmlFor="username">Username:</label>
        <input type="text"  className="input-change" value={username} onChange={handleUsername} id="username" name="username" required />
            </div>

<div className="movie-input">
        <label htmlFor="title">Movie name:</label>
        <input type="text" className="input-change" value={movie} onChange={handleMovie} id="title" name="title" required/>
</div>



<div className="rave-title">

        <label htmlFor="raving">Raving title:</label>
        <input type="text" className="input-change" value={ravingTitle} onChange={handleRavingTitle } id="raving" name="raving" required/>
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

<div className="secret-key">

        <label htmlFor="secret-key">secret key 🤫:</label>
        <input type="password" value={secret} onChange={handleSecret} id="secret" name="secret" required/>
</div>
            </div>

            <div className="textbox-container">

  
        <label htmlFor="raving">Raving:</label>
        <ReactQuill
          id="raving"
          name="raving"
          value={content}
          onChange={setContent}
          />
          </div>
  
        <button type="submit">Submit</button>
      </form>
    )
}



export default PostForm