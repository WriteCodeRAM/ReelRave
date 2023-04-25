import {React, useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { supabase } from "../client"

// import './Post.css'


const Discussion = () => { 

    const [posts, setPosts] = useState([
       
    ])


    useEffect(() => {
        async function fetchPosts() {
            const {data}  = await supabase.from('Posts').select().order('created_at', {ascending: true})
            setPosts(data)
        }
        fetchPosts()
    },[])


    return (
        <div className="post-container">

        
        <div className="filter-container">
            <div className="left">

            <button className="discussion-btn">Top</button>
            <button className="discussion-btn">New</button>
            <button className="discussion-btn">Old</button>
            </div>
            <div className="right">
            <button className="discussion-btn red"><Link to={'/create-post'}>+</Link></button>
            </div>
        </div>
        {posts.map((post, key) => (
  <Link to={`/discussion/${post.id}`} key={key}>
    <div className="card">
      <p>posted by: <span>{post.author}</span></p>
      <div className="card__title">{post.title}</div>
      {post.spoiler ? <span className="spoiler-tag">SPOILER</span> : null}
            {console.log(post.post)}
      {post.post.length < 50 ? (
  <div dangerouslySetInnerHTML={{ __html: post.post }} />
) : (
  <div dangerouslySetInnerHTML={{ __html: `${post.post.slice(0, 50)}...` }} />
)}

<div className="likes-container">
    <button>{post.likes}👍</button>
    <button>{post.dislikes}👎</button>
</div>
    </div>
  </Link>
))}
        </div>
    )
}


export default Discussion