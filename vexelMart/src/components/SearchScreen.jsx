import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList'; // Your existing Product component

export default function SearchScreen() {
  const [products, setProducts] = useState([]);
  
  // 1. Get query from URL
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get('query') || 'all';

  // 2. Fetch from Backend
useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/products?keyword=${query}`);
        
        // 🔍 DEBUGGING: Check what the API actually returned
        console.log("API Response:", result.data); 

        // FIX: Handle if data is wrapped in an object or is the array directly
        if (Array.isArray(result.data)) {
            setProducts(result.data);
        } else if (result.data.products) {
            // Sometimes APIs return { products: [...] }
            setProducts(result.data.products); 
        } else {
            // Fallback to empty array to prevent crash
            setProducts([]); 
        }

      } catch (err) {
        console.log("Error fetching search results:", err);
        setProducts([]); // Ensure it stays an array on error
      }
    };
    fetchData();
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query === 'all' ? 'Everything' : query}"</h1>
      
      {/* 3. Display Results using a CSS Grid container */}
      <div className="products-container">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <ProductList key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}