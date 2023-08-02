import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/api";

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostById(postId)
            .then((response) => {
                setPost(response)
            })
            .catch((error) => {
                console.error('Error fetching post by ID:', error);
            });
    }, [postId]); // Re-fetch post whenever the postId changes

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="d-flex justify-content-center text-center mt-4">
                <div className="col-md-8">
                    <img src="/assets/img/Image_not_available.png" alt="Blog Post" className="img-fluid" />
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    );
}

export default PostDetails;