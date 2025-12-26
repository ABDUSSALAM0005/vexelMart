import { useState, useEffect } from "react";
import api from '../components/lib/axios'


const useDataFetcher = (url) => {
const [products, setProducts] = useState([])
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState([]);

useEffect(() => {
   if (!url) return;

  const fetchProducts = async () => {
  setIsLoading(true);
  setError(null);

    try {
      const res = await api.get(url);
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      // Only set error if it wasn't cancelled
        // if (api.isCancel(error)) {
        //     console.log('Request canceled');
        //     return;
        // }

        console.error("Fetch Error:", error);
        // 3. Actually set the error state
        setError(
            error.response?.data?.message || 
            error.message || 
            "Something went wrong"
        );
    } finally {
        setIsLoading(false)
    }
  }
  fetchProducts();
}, [url]);
    return { products, isLoading, error };
};

export default useDataFetcher