import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const Discussion = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("new"); // default filter is 'new'
  const [isLoading, setIsLoading] = useState(false); // default loading state is false

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true); // Set loading state to true before fetching data

      let orderQuery = {};

      // Set the ordering based on the selected filter
      if (selectedFilter === "new") {
        orderQuery = { column: "created_at", ascending: false };
      } else if (selectedFilter === "old") {
        orderQuery = { column: "created_at", ascending: true };
      } else if (selectedFilter === "top") {
        orderQuery = { column: "likes", ascending: false };
      }

      const { data } = await supabase
        .from("Posts")
        .select()
        .order(orderQuery.column, { ascending: orderQuery.ascending });

      setPosts(data);
      setIsLoading(false); // Set loading state to false after data is fetched
    }

    fetchPosts();
  }, [selectedFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="post-container">
      <div className="filter-container">
        <div className="left">
          <button
            className={`discussion-btn ${selectedFilter === "top" ? "selected" : ""}`}
            onClick={() => handleFilterClick("top")}
          >
            Top
          </button>
          <button
            className={`discussion-btn ${selectedFilter === "new" ? "selected" : ""}`}
            onClick={() => handleFilterClick("new")}
          >
            New
          </button>
          <button
            className={`discussion-btn ${selectedFilter === "old" ? "selected" : ""}`}
            onClick={() => handleFilterClick("old")}
          >
            Old
          </button>
        </div>
        <div className="right">
          <button className="discussion-btn red">
            <Link to={"/create-post"}>+</Link>
          </button>
        </div>
      </div>

      {isLoading && <div className="loading-animation"> <div class="lds-ripple"><div></div><div></div></div></div>}

      {posts.map((post, key) => (
        <Link to={`/discussion/${post.id}`} key={key}>
          <div className="card">
            <p>
              posted by: <span>{post.author}</span>
            </p>
            <div className="card__title">{post.title}</div>
            {post.spoiler ? <span className="spoiler-tag">SPOILER</span> : null}
            {console.log(post.post)}
            {post.post.length < 50 ? (
              <div dangerouslySetInnerHTML={{ __html: post.post }} />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: `${post.post.slice(0, 50)}...`,
                }}
              />
            )}

            <div className="likes-container">
              <button>{post.likes}👍</button>
              <button>{post.dislikes}👎</button>
            </div>
          </div>
        </Link>

      ))}
    </div>
  );
};

export default Discussion;
