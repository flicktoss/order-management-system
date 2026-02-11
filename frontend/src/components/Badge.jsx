import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variantClasses = {
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
        info: 'badge-info',
        default: 'badge-default',

        // Order status specific
        PENDING: 'badge-warning',
        CONFIRMED: 'badge-info',
        PROCESSING: 'badge-info',
        SHIPPED: 'badge-info',
        DELIVERED: 'badge-success',
        CANCELLED: 'badge-error',
        FAILED: 'badge-error',
    };

    return (
        <span className={`${variantClasses[variant] || variantClasses.default} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
