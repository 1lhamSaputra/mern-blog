import React from 'react';

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="text-center">
                <h1 className="display-1">Page Not Found</h1>
                <p className="lead">The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default NotFound;