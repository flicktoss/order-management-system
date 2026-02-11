import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api/user.api';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import Badge from '../components/Badge';
import { formatDate } from '../utils/formatters';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader fullScreen />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">Users</h1>
                <p className="text-muted">Manage system users</p>
            </div>

            {error && <ErrorBanner message={error} onClose={() => setError('')} />}

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input max-w-md"
                />
            </div>

            {filteredUsers.length === 0 ? (
                <div className="card p-12 text-center">
                    <p className="text-muted">No users found</p>
                </div>
            ) : (
                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="font-medium text-primary">{user.name}</td>
                                        <td className="text-muted">{user.email}</td>
                                        <td className="text-muted">{user.phone}</td>
                                        <td>
                                            <Badge variant={user.role === 'ADMIN' ? 'info' : 'default'}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="text-sm text-muted">{formatDate(user.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
