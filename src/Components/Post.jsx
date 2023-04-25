import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import ReactQuill from "react-quill";

const Post = () => {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [secret, setSecret] = useState("")
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from('Posts').select().eq('id', id).single();
      if (error) {
        console.log(error);
      } else {
        setPost(data);
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setSecret(data.secretkey)
        setComments(data.comments || []); // initialize as empty array
      }
    }
    fetchPost();
  }, [id]);
  

  const handleLikes = async () => {
    setLikes(likes + 1)
    const { data, error } = await supabase.from('Posts').update({ likes: likes + 1 }).eq('id', id).single();
    if (error) {
      console.log(error);
    } else {
      setLikes(data.likes);
    }
  };

  const handleDislikes = async () => {
    setDislikes(dislikes + 1)
    const { data, error } = await supabase.from('Posts').update({ dislikes: dislikes + 1 }).eq('id', id).single();
    if (error) {
      console.log(error);
    } else {
      setDislikes(data.dislikes);
    }
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    const newCommentObject = {
      comment: newComment,
      created_at: new Date().toISOString(),
    };
    setComments([...comments, newCommentObject]); // Update the state locally
    const { data, error } = await supabase
      .from('Posts')
      .update({
        comments: [...comments, newCommentObject],
      })
      .eq('id', id)
      .single();
    if (error) {
      console.log(error);
    } else {
      setComments(data.comments); // Update the state with the response from Supabase
      setNewComment("");
    }
  };

  const handleDeletePost = async () => {
    const confirmation = window.prompt("Please enter the secret key to confirm deletion:");
    if (confirmation === secret) {
      await supabase.from('Posts').delete().eq('id', id);
      window.location.href = "/discussion";
    } else {
      alert("Invalid secret key. Please try again.");
    }
  };
  
  

  return post ? (
    <div className="post-page">
    <div className="post-card">
      <h2 className="post-card__title">{post.title}</h2>
      <p className="post-card__author">{post.author}</p>
      <div className="post-card__content">
        <div dangerouslySetInnerHTML={{ __html: post.post }} />
      </div>
      <div className="likes-container">
        <div className="likes">

        <button onClick={handleLikes}>{likes}👍</button>
        <button onClick={handleDislikes}>{dislikes}👎</button>
        </div>
        <div className="delete">
            <button onClick={handleDeletePost}>🗑️</button>
        </div>
      </div>
   
    
    </div>
    <div className="comments-and-comment-form-container">
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <label>
         <h4>Add a comment:</h4>
            <ReactQuill
          id="comment"
          name="comment"
          value={newComment}
          onChange={setNewComment}
          />
          </label>
          <button type="submit">Submit</button>
        </form>
        <div className="comment-container">
           {comments.length !== 1 ? <h3>{comments.length} Comments</h3> : <h3>{comments.length} Comment</h3> }
        {comments
  ? comments.map((comment, index) => (
      <div key={index} className="comment">
        <p dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
        {/* <p>by {comment.user_id}</p> */}
        <p>Anon: {new Date(comment.created_at).toLocaleString()}</p>
      </div>
    ))
    : null}
    </div>

      </div>
    </div>
    
  ) : (
    <p>Loading post...</p>
  );
};

export default Post;
