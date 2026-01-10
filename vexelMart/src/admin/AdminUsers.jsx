import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../components/lib/axios';
import { Loader2, Trash2, Edit, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/user');
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure? This cannot be undone.')) {
      try {
        await api.delete(`/user/${id}`);
        toast.success('User deleted');
        fetchUsers(); // Refresh list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-white w-8 h-8"/></div>;

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Users</h1>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-700/50 text-xs uppercase font-medium text-gray-300">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">EMAIL</th>
                <th className="px-6 py-4 text-center">ADMIN</th>
                <th className="px-6 py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-mono text-xs">{user._id.substring(0, 10)}...</td>
                  <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                  <td className="px-6 py-4 text-blue-400 underline decoration-blue-400/30">{user.email}</td>
                  
                  {/* Admin Status */}
                  <td className="px-6 py-4 text-center">
                    {user.isAdmin ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>

                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    {/* Edit Button */}
                    <Link 
                      to={`/admin/user/${user._id}/edit`} 
                      className="p-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    {/* Delete Button */}
                    <button 
                      onClick={() => deleteHandler(user._id)}
                      className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}