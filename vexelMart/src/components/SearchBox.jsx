import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialKeyword = query.get("keyword") || "";

  const [searchTerm, setSearchTerm] = useState(initialKeyword);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // 🔥 Sync URL with debounced input
  useEffect(() => {
    if (debouncedSearch.trim()) {
      navigate(`/?keyword=${debouncedSearch}`);
    } else {
      navigate(`/`);
    }
  }, [debouncedSearch, navigate]);

  return (
    <>
      {location.pathname === "/" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (keyword.trim()) {
              navigate(`/?keyword=${keyword}`);
            } else {
              navigate("/");
            }
          }}
          className="flex relative w-64"
        >
          <button type="submit">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </button>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 h-9 bg-background border-border rounded-full"
          />
        </form>
      )}
    </>
  );
}
