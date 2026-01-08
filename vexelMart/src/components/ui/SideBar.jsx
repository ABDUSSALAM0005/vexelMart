import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, Package, Star, Shield, LayoutDashboard, ShoppingBag, Users, Ticket, CreditCard, Store, 
  History, MapPin, Globe,  Bell, Settings 
} from 'lucide-react'; // Assuming you have lucide-react installed



export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth(); // Get the logged-in user

  //standard userItems
const userItems = [
  { name: 'Your profile', icon: User, path: '/profile' }, // Simulating active state
  { name: 'Your orders', icon: Package, path: '/profile/orders' },
  { name: 'Your reviews', icon: Star, path: '/profile/reviews' },
  { name: 'Account security', icon: Shield, path: '/profile/security' },
];

// Admin Items
  const adminItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Products', icon: ShoppingBag, path: '/admin/products' },
    { name: 'Orders', icon: Package, path: '/admin/orders' },
    { name: 'Users', icon: Users, path: '/admin/users' },
  ];

  // Decide which items to show
  const menuItems = user?.isAdmin 
    ? [...userItems, { name: '--- Admin ---', isDivider: true }, ...adminItems] 
    : userItems;
  
  return (
    <aside className="w-full md:h-[80vh] bg-card border-r">
      <nav className="space-y-1 w-full">

        {menuItems.map((item, index) => {
          
          // 1. Handle Divider (No icon needed)
          if (item.isDivider) {
             return (
                <div key={index} className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                   {item.name.replace(/---/g, '')}
                </div>
             );
          }

          const isActive = location.pathname === item.path;
          
          // 2. Safety Check: Does the icon exist?
          const IconComponent = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium transition
                ${isActive
                  ? 'text-primary border-l-4 border-primary bg-orange-500/10' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
                }
              `}
            >
              {/* Only render if IconComponent is valid */}
              {IconComponent ? (
                <IconComponent
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                />
              ) : (
                // Fallback (e.g., empty space) if icon is missing
                <span className="mr-3 h-5 w-5 block" />
              )}
              
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
