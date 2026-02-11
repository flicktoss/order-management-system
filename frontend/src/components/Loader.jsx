import React from 'react';

const Loader = ({ size = 'md', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
    };

    const loader = (
        <div className={`animate-spin rounded-full border-b-2 border-accent ${sizeClasses[size]}`}></div>
    );

    if (fullScreen) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                {loader}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            {loader}
        </div>
    );
};

export default Loader;
