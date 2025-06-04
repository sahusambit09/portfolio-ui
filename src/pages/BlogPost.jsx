// src/pages/BlogPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPost.css';

function BlogPost() {
  const { postId } = useParams(); // e.g., "1"
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/posts.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(postId, 10));
        if (!found) {
          throw new Error('Post not found');
        }
        setPost(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <article className="blog-post">
      <h1>{post.title}</h1>
      <p className="post-date">{post.date}</p>
      {/* Render HTML content safely */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <Link to="/blog" className="back-link">
        ← Back to Blog
      </Link>
    </article>
  );
}
export default BlogPost;
