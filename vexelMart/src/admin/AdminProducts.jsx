import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../components/lib/axios';
import { Loader2, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false); // Loading state for create button
  
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products'); 
      // Assuming your getProducts returns { products: [...] } or just [...]
      // Adjust based on your public getProducts controller
      setProducts(data.products || data); 
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE HANDLER
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted');
        fetchProducts(); // Refresh list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  // CREATE HANDLER
  const createHandler = async () => {
    try {
        setCreateLoading(true);
        // This creates a dummy product and gives us the ID
        const { data } = await api.post('/products/create');
        toast.success('Sample product created');
        // Navigate to the edit page immediately
        navigate(`/admin/product/${data._id}/edit`);
    } catch (error) {
        toast.error(error.response?.data?.message || 'Create failed');
    } finally {
        setCreateLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-white" /></div>;

  return (
    <div className="p-6 text-white min-h-screen">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <button 
          onClick={createHandler}
          disabled={createLoading}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          {createLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-4 h-4" />}
          Create Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-700/50 text-xs uppercase font-medium text-gray-300">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">PRICE</th>
                <th className="px-6 py-4">CATEGORY</th>
                <th className="px-6 py-4">BRAND</th>
                <th className="px-6 py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-mono text-xs">{product._id.substring(0, 10)}...</td>
                  <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-green-400">${product.price}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    
                    {/* Edit Button */}
                    <Link 
                      to={`/admin/product/${product._id}/edit`} 
                      className="p-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>

                    {/* Delete Button */}
                    <button 
                      onClick={() => deleteHandler(product._id)}
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