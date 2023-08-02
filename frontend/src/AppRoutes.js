import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './helpers/AuthContext';
import BlogPost from './components/BlogPost';
import AuthForm from './components/AuthForm';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import NotFound from './components/NotFound';

const AppRoutes = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Routes>
            <Route exact path="/" element={<BlogPost />} />
            <Route exact path="/post/:postId" element={<PostDetails />} />

            {isLoggedIn && <Route path="/posts" element={<Posts />} />}
            {!isLoggedIn && <Route exact path="/login" element={<AuthForm />} />}
            {/* Define your routes here */}

            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
    );
};

export default AppRoutes;


