import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../helpers/AuthContext';
import { createPost, deletePost, updatePost } from "../services/api";

const Posts = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [postId, setPostId] = useState('');
    const [content, setContent] = useState('');
    const [isPostLoad, setIsPostLoad] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/post');
                setPosts(response.data)
            } catch (error) {
                console.log('Error fetching blog posts', error)
            }
        }

        // console.log(isLoggedIn, 'isLoggedIn')

        // Fetch blog posts only if the user is logged in
        if (isLoggedIn) {
            fetchPost();

            if (isPostLoad) {
                fetchPost();
                setIsPostLoad(false); // Reset the state to prevent re-fetching on every render
            }
        } else {
            // Redirect to '/' if user is not logged in
            navigate('/');
        }

    }, [isLoggedIn, navigate, isPostLoad]);


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content };
        try {
            // Send the new post data to the API
            await createPost(postData);
            setTitle('');
            setContent('');
            setIsPostLoad(true);
        } catch (error) {
            console.error('Error adding the post:', error);
        }
    }

    const handleEditSubmit = async () => {
        const postData = { title, content };
        try {
            await updatePost(postData, postId);
            setPostId('');
            setTitle('');
            setContent('');
            setIsPostLoad(true);
            setIsEdit(false);
        } catch (error) {
            console.error('Error adding the post:', error);
        }
    }

    const handleDelete = (postId) => {
        deletePost(postId)
        setIsPostLoad(true);
    }

    const handleEdit = (post) => {
        setIsEdit(true)
        setPostId(post._id)
        setTitle(post.title)
        setContent(post.content)
    }

    const handleCancleEdit = () => {
        setIsEdit(false)
        setTitle('')
        setContent('')
    }

    function truncateString(str, maxLength) {
        if (str.length <= maxLength) {
            return str;
        } else {
            return str.slice(0, maxLength) + '....';
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Blog Posts</h1>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="Title"
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control mt-1"
                                    id="content"
                                    value={content}
                                    onChange={handleContentChange}
                                    placeholder="Content"
                                />
                            </div>
                            {!isEdit ? (
                                <>
                                    <button type="submit" className="btn btn-primary mt-2 mb-2">Add Post</button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary mt-2 mb-2" onClick={handleEditSubmit}>Edit Post</button> <button type="button" className="btn btn-secondary mt-2 mb-2" onClick={handleCancleEdit}>Cancel</button>
                                </>
                            )}

                        </form>
                    </div>


                    <div className="col-md-8">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center" style={{ width: '5%' }} >No</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th className="text-center" style={{ width: '30%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={post._id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td>{post.title}</td>
                                        <td>{truncateString(post.content, 85)}</td>
                                        <td className="text-center">
                                            {/* Add your Bootstrap-styled action buttons here */}
                                            <button className="btn btn-outline-info btn-sm" style={{ width: '100px' }} onClick={() => handleEdit(post)}>Edit</button> <button className="btn btn-outline-danger btn-sm" style={{ width: '100px' }} onClick={() => handleDelete(post._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;