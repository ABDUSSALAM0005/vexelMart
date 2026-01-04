// src/components/Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Your Nav component
import { ShoppingCart, User, Search, Menu, DoorOpenIcon, ExternalLinkIcon, LogOutIcon } from "lucide-react";
// FIX: Use the standard alias for components
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import VexelMartLogo from "../assets/img/VexelMartLogo";
import MobileNav from "./MobileNav";
import CartIcon from "./CartIcon";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import SearchBox from "./SearchBox";

const Header = () => {
  const { user, logoutAction } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  // const { dispatch } = useCart();

  const logoutHandler = () => {
    logoutAction();
  };

  return (
    // Outer container: Sticky, dark card background
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-lg">
      {/* === MAIN FLEX ROW (LOGO | SEARCH BAR | ICONS) === */}
      <div className="flex items-center justify-between py-4 px-4 max-w-7xl mx-auto">
        {/* 1. LOGO / BRAND NAME */}
        <Link to="/" className="flex items-center shrink-0">
          {" "}
          {/* shrink-0 prevents logo from shrinking */}
          <span>
            <VexelMartLogo className="h-7 w-auto" />
          </span>
          <span className="font-heading text-xl md:text-2xl font-bold text-primary">
            VEXEL MART
          </span>
        </Link>

        {/* 2. NAVIGATION LINKS (Desktop Only) */}
        <div className="hidden lg:flex mx-8">
          <Navbar />
        </div>

        {/* 3. SEARCH BAR & ACTIONS ICONS */}
        <div className="flex items-center space-x-3">
          {/* Search Input (Desktop Only) */}
          <div className="hidden lg:flex relative w-64">
            <SearchBox/>
          </div>

          {/* User Profile / Sign In Icon */}
          {user ? (
            <>
              <button
                className="flex transition-all duration-300 hover:text-primary/60"
                onClick={logoutHandler}
              >
                <LogOutIcon/> Logout
              </button>
            </>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          <Button
            variant="default"
            size="icon"
            className="h-9 w-9 text-text-light hover:text-primary rounded-full"
          >
            <Link to="/profile">
              <User className="h-6 w-6" />
            </Link>
          </Button>

          {/* Shopping Cart Icon */}
          <Button
            asChild
            variant=""
            size="icon"
            className="relative h-9 w-9 text-text-light hover:text-primary"
          >
            <Link to="/cart">
              <CartIcon />
            </Link>
          </Button>

          {/* Mobile Menu Icon (Show on small screens) */}
          <Button
            variant="secondary"
            size="icon"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 lg:hidden  text-text-light hover:text-primary"
          >
            <MobileNav />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
