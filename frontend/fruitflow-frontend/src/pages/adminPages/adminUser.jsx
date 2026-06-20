import axios from "axios"
import { useEffect, useState } from "react"
import { API_BASE_URL } from "../../config/api"
import toast from "react-hot-toast"

export default function AdminUserPage() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [viewingUser, setViewingUser] = useState(null)
    const [editingUser, setEditingUser] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    function fetchUsers() {
        axios.get(`${API_BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setUsers(res.data)
            setLoading(false)
        }).catch((err) => {
            setError("Failed to load users")
            setLoading(false)
        })
    }

    function handleBlockUser(userID, isBlocked) {

    const url = isBlocked
        ? `${API_BASE_URL}/users/${userID}/unblock`
        : `${API_BASE_URL}/users/${userID}/block`

    axios.put(url, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(() => {
        toast.success(
            isBlocked
                ? "User unblocked successfully"
                : "User blocked successfully"
        )
        fetchUsers()
    })
    .catch((err) => {
        console.log(err)
        toast.error("Failed to update user")
    })
}

    function handleRoleChange(userID, newRole) {

    const url =
        newRole === "admin"
            ? `${API_BASE_URL}/users/${userID}/make-admin`
            : `${API_BASE_URL}/users/${userID}/remove-admin`

    axios.put(url, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(() => {
        toast.success("User role updated")
        fetchUsers()
    })
    .catch((err) => {
        console.log(err)
        toast.error("Failed to update role")
    })
}

    function handleDeleteUser(userID) {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`${API_BASE_URL}/users/${userID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then(() => {
                toast.success("User deleted")
                fetchUsers()
            }).catch(() => {
                toast.error("Failed to delete user")
            })
        }
    }

    const filtered = users.filter(u => {
        const matchesSearch = 
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        
        const matchesRole = roleFilter === "all" || u.role === roleFilter
        const matchesStatus = statusFilter === "all" || 
                             (statusFilter === "active" && !u.isBlocked) ||
                             (statusFilter === "blocked" && u.isBlocked)

        return matchesSearch && matchesRole && matchesStatus
    })

    const getRoleColor = (role) => {
        return role === "admin" 
            ? "bg-purple-100 text-purple-700" 
            : "bg-blue-100 text-blue-700"
    }

    const getStatusStyle = (isBlocked) => {
        return isBlocked
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
    }

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-green-700">Loading users...</p>
        </div>
    )

    if (error) return (
        <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
        </div>
    )

    return (
        <div className="p-6 bg-gray-50 min-h-full">

            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-medium text-gray-800">👥 Users</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage customer and admin accounts</p>
                </div>
            </div>

           
            <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Total users</p>
                    <p className="text-2xl font-medium">{users.length}</p>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">All users</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Admins</p>
                    <p className="text-2xl font-medium">{users.filter(u => u.role === "admin").length}</p>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Elevated</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Active</p>
                    <p className="text-2xl font-medium">{users.filter(u => !u.isBlocked).length}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Blocked</p>
                    <p className="text-2xl font-medium">{users.filter(u => u.isBlocked).length}</p>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Suspended</span>
                </div>
            </div>

          
            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-green-50">
                        <tr>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">User</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Email</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Role</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Status</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-green-700 uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((user) => (
                            <tr key={user._id} className="border-t border-gray-50 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg object-cover bg-green-100 flex items-center justify-center font-bold text-green-700">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{user.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {user.email}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${getRoleColor(user.role)}`}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(user.isBlocked)}`}>
                                        {user.isBlocked ? "Blocked" : "Active"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setViewingUser(user)}
                                            className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg cursor-pointer"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleBlockUser(user._id, user.isBlocked)}
                                            className={`text-xs px-3 py-1.5 rounded-lg cursor-pointer ${
                                                user.isBlocked
                                                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                                                    : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                                            }`}
                                        >
                                            {user.isBlocked ? "Unblock" : "Block"}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No users found</p>
                    </div>
                )}
            </div>

           
            {viewingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">

                        
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-lg font-medium text-gray-800">User Details</h2>
                            <button 
                                onClick={() => setViewingUser(null)} 
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                          
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center font-bold text-3xl text-green-700 mx-auto mb-3">
                                    {viewingUser.name.charAt(0).toUpperCase()}
                                </div>
                                <h3 className="text-lg font-medium text-gray-800">{viewingUser.name}</h3>
                                <p className="text-gray-500 text-sm">{viewingUser.email}</p>
                            </div>

                          
                            <div className="space-y-4 mb-6">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Email</p>
                                    <p className="text-sm font-medium text-gray-800">{viewingUser.email}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Role</p>
                                    <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getRoleColor(viewingUser.role)}`}>
                                        {viewingUser.role.charAt(0).toUpperCase() + viewingUser.role.slice(1)}
                                    </span>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 mb-1">Status</p>
                                    <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(viewingUser.isBlocked)}`}>
                                        {viewingUser.isBlocked ? "🔒 Blocked" : "✓ Active"}
                                    </span>
                                </div>
                            </div>

                           
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        handleBlockUser(viewingUser._id, viewingUser.isBlocked)
                                        setViewingUser(null)
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        viewingUser.isBlocked
                                            ? "bg-green-700 hover:bg-green-800 text-white"
                                            : "bg-amber-700 hover:bg-amber-800 text-white"
                                    }`}
                                >
                                    {viewingUser.isBlocked ? "Unblock User" : "Block User"}
                                </button>
                                <button
                                    onClick={() => {
                                        handleDeleteUser(viewingUser._id)
                                        setViewingUser(null)
                                    }}
                                    className="flex-1 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}