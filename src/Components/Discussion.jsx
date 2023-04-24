import {React, useState, useEffect} from "react"
import { Link } from "react-router-dom"

// import './Post.css'


const Discussion = () => { 

    const [posts, setPosts] = useState([
       
    ])

    const [active, setActive] = useState(null)

    


    return (
        <div className="post-container">

        
        <div className="filter-container">
            <div className="left">

            <button className="discussion-btn">Top</button>
            <button className="discussion-btn">New</button>
            <button className="discussion-btn">Old</button>
            </div>
            <div className="right">
            <button className="discussion-btn red" onClick={handleNewPost}><Link to={'/create-post'}>+</Link></button>
            </div>
        </div>
       {posts.map( (post, key) =>  (
        <div className="card" key={key}>
          <p>posted by: {post.username}</p>
          <div className="card__title">{post.postTitle}</div>
          <div>{post.postContent}</div>
        </div>
       ))}
        </div>
    )
}


export default Discussion