import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../components/lib/axios';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserEditScreen() {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/user/${userId}`);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        toast.error("Could not load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      await api.put(`/user/${userId}`, { name, email, isAdmin });
      toast.success('User updated successfully');
      navigate('/admin/users');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-white w-10 h-10"/></div>;

  return (
    <div className="max-w-xl mx-auto p-6 text-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
          <Link to="/admin/users" className="text-gray-400 hover:text-white flex items-center gap-2 transition">
            <ArrowLeft className="w-5 h-5" /> Back to Users
          </Link>
          <h1 className="text-2xl font-bold">Edit User</h1>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg">
        <form onSubmit={submitHandler} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              required
              value={name}
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Is Admin Checkbox */}
          <div className="flex items-center">
            <input
              id="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="isAdmin" className="ml-3 text-sm font-medium text-gray-300">
              Is Admin?
            </label>
          </div>

          <button
            type="submit"
            disabled={updateLoading}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-500/20"
          >
            {updateLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}