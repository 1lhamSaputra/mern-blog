import React, { useState } from 'react';
import { useAuth } from '../helpers/AuthContext'; // Import the useAuth hook

const AuthForm = () => {
    const { login } = useAuth(); // Use the login function from the context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin } = useAuth();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the handleLogin function from the useAuth hook
        handleLogin({ email, password });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
