import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'md' }) => {
    if (!isOpen) return null;

    const maxWidthClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-primary bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className={`card relative w-full ${maxWidthClasses[maxWidth]} p-6 shadow-medium`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-primary">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-muted hover:text-primary transition-colors"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
