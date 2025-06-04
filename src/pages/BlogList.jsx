// src/pages/BlogList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Fetch posts.json from public folder
    fetch('/posts.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency: run only on mount

  if (loading) return <p>Loading blog posts...</p>;
  if (error) return <p>Error loading posts: {error}</p>;

  return (
    <section className="blog-list">
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.id} className="post-preview">
          <h2>{post.title}</h2>
          <p className="post-date">{post.date}</p>
          <p>{post.snippet}</p>
          <Link to={`/blog/${post.id}`} className="read-more">
            Read More →
          </Link>
        </div>
      ))}
    </section>
  );
}
export default BlogList;
