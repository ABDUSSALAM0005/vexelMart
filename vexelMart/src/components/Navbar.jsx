// src/components/Navbar.jsx (or Nav.jsx)

import { NavLink } from "react-router-dom";

// E-COMMERCE LINKS (UPDATED FOR VEXEL MART)
const Links = [
  {
    name: "Shop All",
    path: "/shop",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Orders",
    path: "/orders", // Requires JWT/Login
  },
  {
    name: "Support",
    path: "/contact",
  },
];

const Navbar = () => {
  // We don't need useLocation() or console.log() here, NavLink handles active state
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {Links.map((link, index) => {
        return (
          <NavLink
            // Styling logic for active state:
            className={({ isActive }) =>
              `uppercase tracking-wider transition-colors duration-200 
               ${isActive ? "text-primary border-b-2 border-primary" : "text-text-light hover:text-primary"}
               pb-1` // pb-1 for space below the text so the border doesn't touch it
            }
            to={link.path}
            key={index}
          >
            {link.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navbar;