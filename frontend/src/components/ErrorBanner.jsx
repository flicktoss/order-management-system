import React from 'react';

const ErrorBanner = ({ message, details = [], onClose }) => {
    if (!message) return null;

    return (
        <div className="bg-red-50 border border-error rounded-lg p-4 mb-6">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-error">{message}</h3>
                    {details.length > 0 && (
                        <div className="mt-2 text-sm text-error">
                            <ul className="list-disc list-inside space-y-1">
                                {details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-3 flex-shrink-0 text-error hover:text-red-700 transition-colors"
                    >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorBanner;
