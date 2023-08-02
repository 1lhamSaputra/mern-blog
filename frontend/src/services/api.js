import axios from "axios";
import { getCookie } from "../helpers/Cookie";


const BASE_URL = 'http://localhost:3001/api'; // Replace this with your actual API URL

export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/post`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/post/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const createPost = async (postData) => {
    const token = getCookie('token');
    try {
        const response = await axios.post('http://localhost:3001/api/post', postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export const updatePost = async (postData, postId) => {
    const token = getCookie('token');
    try {
        const response = await axios.put(`http://localhost:3001/api/post/${postId}`, postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export const deletePost = async (postId) => {
    const token = getCookie('token');
    try {
        const response = await axios.delete(`http://localhost:3001/api/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}