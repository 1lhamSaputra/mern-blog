const Post = require('../models/Post');
const errorHandlers = require('../utils/errorHandlers')

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        errorHandlers.handleErrors(error, req, res)
    }
}

// Get post by ID
exports.getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        res.json(post);
    } catch (error) {
        errorHandlers.handleErrors(error, req, res)
    }
}

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const {title, content} = req.body;

        const newPost = new Post({
            title,
            content,
            author: req.userId
        });

        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (error) {
        errorHandlers.handleErrors(error, req, res)
    }
}

// Update post by ID
exports.updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const {title, content} = req.body;

        const existingPost = await Post.findById(id);

        if (!existingPost) {
            return res.status(404).json('Post not found')
        }

        if (existingPost.author.toString() != req.userId) {
            return res.status(403).json('Not authorized to update this post');
        }

        existingPost.title = title;
        existingPost.content = content;

        const updatedPost = await existingPost.save();
        res.json(updatedPost);
    } catch (error) {
        errorHandlers.handleErrors(error, req, res)
    }
}

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        await Post.findByIdAndDelete(id);
        res.json('Post deleted')
    } catch (error) {
        errorHandlers.handleErrors(error, req, res)
    }
}