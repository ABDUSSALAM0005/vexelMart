import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../components/lib/axios';
import { Loader2, ArrowLeft, Save, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; // Get the first file selected
    const formData = new FormData();
    formData.append('image', file); // 'image' matches upload.single('image') in backend
    
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // Send to our new backend route
      const { data } = await api.post('/upload', formData, config);

      // Backend returns { image: "https://res.cloudinary..." }
      setImage(data.image); 
      setUploading(false);
      toast.success('Image uploaded!');

    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Image upload failed');
    }
  };

  // 1. Fetch Product Data on Load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${productId}`);
        
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setSlug(data.slug);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        
      } catch (error) {
        toast.error("Could not load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // 2. Handle Update
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      
      await api.put(`/products/${productId}`, {
        name,
        price,
        image,
        brand,
        slug,
        category,
        countInStock,
        description,
      });

      toast.success('Product updated successfully');
      navigate('/admin/products');
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-white w-10 h-10"/></div>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-white min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
          <Link to="/admin/products" className="text-gray-400 hover:text-white flex items-center gap-2 transition">
            <ArrowLeft className="w-5 h-5" /> Go Back
          </Link>
          <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg">
        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              />
            </div>
             {/* Count In Stock */}
             <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Count In Stock</label>
              <input
                type="number"
                required
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Brand */}
             <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              />
            </div>
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          
           {/* Slug */}
          <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
              placeholder="Image URL"
            />
            {/* Simple preview if URL exists */}
            {image && (
                <div className="mt-2">
                    <img src={image} alt="Preview" className="h-20 w-20 object-cover rounded border border-gray-600" />
                </div>
            )}
          </div>

          <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4"/>}
                    <span>{uploading ? "Uploading..." : "Choose File"}</span>
                    <input 
                        type="file" 
                        onChange={uploadFileHandler} 
                        className="hidden" // Hide the ugly default input
                    />
                </label>
                <span className="text-gray-500 text-xs">JPG, PNG or WEBP</span>
            </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
             <button
              type="submit"
              disabled={updateLoading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-500/20"
            >
              {updateLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
              Update Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}