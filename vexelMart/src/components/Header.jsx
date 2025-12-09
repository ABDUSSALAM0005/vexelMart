// src/components/Header.jsx

import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar' // Your Nav component
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
// FIX: Use the standard alias for components
import { Input } from '../components/ui/input'; 
import { Button } from '../components/ui/button'; 
import VexelMartLogo from '../assets/img/VexelMartLogo';
import MobileNav from './MobileNav';


const Header = () => {
  
  return (
    // Outer container: Sticky, dark card background
    <header className='sticky top-0 z-50 bg-card border-b border-border shadow-lg'>
      
      {/* === MAIN FLEX ROW (LOGO | SEARCH BAR | ICONS) === */}
      <div className='flex items-center justify-between py-4 px-4 max-w-7xl mx-auto'>
        
        {/* 1. LOGO / BRAND NAME */}
        <Link to="/" className="flex items-center shrink-0"> {/* shrink-0 prevents logo from shrinking */}
        <span>
          <VexelMartLogo className="h-7 w-auto"/>
        </span>
          <span className="font-heading text-xl md:text-2xl font-bold text-primary">
            VEXEL MART
          </span>
        </Link>

        {/* 2. NAVIGATION LINKS (Desktop Only) */}
        <div className="hidden lg:flex mx-8">
            <Navbar/>
        </div>

        {/* 3. SEARCH BAR & ACTIONS ICONS */}
        <div className="flex items-center space-x-3">

          {/* Search Input (Desktop Only) */}
          <div className="hidden lg:flex relative w-64"> {/* Show full search input only on extra large screens */}
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-10 h-9 bg-background border-border rounded-full" 
            />
          </div>

          {/* User Profile / Sign In Icon */}
          <Button variant="default" size="icon" className="h-9 w-9 text-text-light hover:text-primary rounded-full">
            <User className="h-6 w-6" />
          </Button>

          {/* Shopping Cart Icon */}
          <Button variant="" size="icon" className="relative h-9 w-9 text-text-light hover:text-primary">
            <ShoppingCart className="h-6 w-6" />
          </Button>

          {/* Mobile Menu Icon (Show on small screens) */}
          <Button variant="secondary" size="icon" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 lg:hidden  text-text-light hover:text-primary">
            <MobileNav/>
          </Button>

        </div>

      </div>
    </header>
  )
}

export default Header