import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllPosts } from '../services/api';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the blog posts from the API
    getAllPosts()
      .then((postsData) => {
        setPosts(postsData)
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      });
  }, [])

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Blog List</h2>
      <div className="row">
        {posts.map((blog) => (
          <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
            <Link to={`/post/${blog._id}`} style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-body">
                  <img src="/assets/img/Image_not_available.png" alt="Blog Post" className="img-fluid" />
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.content}</p>
                  {/* <a href="#" className="btn btn-primary">Read more</a> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
