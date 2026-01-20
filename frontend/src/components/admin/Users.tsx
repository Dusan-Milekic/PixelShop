import { useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    full_name: string;
    email: string;
    created_at: string;
    role?: string;
}

export default function Users() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [showUsers, setShowUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const uniqueRoles = [...new Set(users.map(u => u.role || 'Customer'))];

    const handleRoleChange = (role: string) => {
        setSelectedRoles(prev => 
            prev.includes(role) 
                ? prev.filter(r => r !== role)
                : [...prev, role]
        );
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const userRole = user.role || 'Customer';
        const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(userRole);
        
        return matchesSearch && matchesRole;
    });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://pixelshopbackend.netlify.app/api/user/api/accounts');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const listAllUsers = () => {
        setShowUsers(true);
        fetchUsers();
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:8000/api/accounts/${id}`);
                alert('User deleted successfully!');
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
                        <p className="text-xl font-semibold text-gray-700">Loading users...</p>
                    </div>
                </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
                <p>Here you can manage registered users.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <button
                    onClick={listAllUsers}
                    className="cursor-pointer text-xl font-semibold mb-4 bg-blue-400 w-50 text-center py-3 px-6 rounded-lg text-white hover:bg-blue-500 transition"
                >
                    Show all users
                </button>
            </div>

            {showUsers && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">All Users</h2>
                    
                    {/* Filters */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>
                        
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">Search by Name or Email</label>
                            <input
                                type="text"
                                placeholder="Enter name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Roles</label>
                            <div className="flex flex-wrap gap-3">
                                {uniqueRoles.map(role => (
                                    <label key={role} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles.includes(role)}
                                            onChange={() => handleRoleChange(role)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">{role}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedRoles([]);
                            }}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                            Clear Filters
                        </button>
                    </div>

                    {filteredUsers.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No users found</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Joined</th>
                                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr 
                                            key={user.id} 
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                                        >
                                            <td className="border border-gray-300 px-4 py-3 text-gray-700">{user.id}</td>
                                            <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{user.full_name}</td>
                                            <td className="border border-gray-300 px-4 py-3 text-gray-600">{user.email}</td>
                                            <td className="border border-gray-300 px-4 py-3">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                                    {user.role || 'Customer'}
                                                </span>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-3 text-gray-600">
                                                {new Date(user.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-3 text-center">
                                                <div className="flex gap-2 justify-center">
                                                    <button 
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(user.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Showing {filteredUsers.length} of {users.length} users
                    </div>
                </div>
            )}
        </>
    );
}