import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, Package, Star, Ticket, CreditCard, Store, 
  History, MapPin, Globe, Shield, Bell, Settings 
} from 'lucide-react'; // Assuming you have lucide-react installed

const menuItems = [
  { name: 'Your profile', icon: User, path: '/profile' }, // Simulating active state
  { name: 'Your orders', icon: Package, path: '/profile/orders' },
  { name: 'Your reviews', icon: Star, path: '/profile/reviews' },
  { name: 'Account security', icon: Shield, path: '/profile/security' },



//   { name: 'Coupons & offers', icon: Ticket, path: '/profile/coupons' },
//   { name: 'Credit balance', icon: CreditCard, path: '/profile/balance' },
//   { name: 'Followed stores', icon: Store, path: '/profile/stores' },
//   { name: 'Browsing history', icon: History, path: '/profile/history' },
//   { name: 'Addresses', icon: MapPin, path: '/profile/addresses' },
//   { name: 'Country/Region', icon: Globe, path: '/profile/settings' },
//   { name: 'Notifications', icon: Bell, path: '/profile/notifications' },
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-full md:h-[80vh] bg-card border-r">
      <nav className="space-y-1 w-full">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
          <Link
            key={item.name}
            to={item.path}
            className={`
              group flex items-center px-3 py-2 text-sm font-medium
              ${isActive
                ? 'text-primary border-l-4 border-primary bg-orange-50' 
                : 'text-white hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
              }
            `}
          >
            <item.icon
              className={`mr-3 h-5 w-5 flex-shrink-0 ${
                isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
              }`}
            />
            {item.name}
          </Link>
        )})}
      </nav>
    </aside>
  );
}