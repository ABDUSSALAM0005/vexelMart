import React, { useState } from 'react';
import { cn } from "./lib/utils";
import { AlertCircle, XOctagon } from 'lucide-react'; // Icons for different message types
import useDataFetcher from "../hooks/useDataFetcher"

/**
 * Reusable Message/Alert Component for Vexel Mart
 * @param {string} variant - 'info' (default), 'success', or 'destructive' (error)
 * @param {string} children - The actual message text
 * @param {string} className - Optional Tailwind classes for overriding style
 */
const Message = ({ variant = 'destructive', children, className }) => {
  
  // Base styling for all alerts
  const baseStyle = "px-4 py-3 rounded-lg relative my-4 flex items-start gap-4 shadow-lg";

  // Determine colors and icon based on variant
  let colorClasses = "";
  let Icon = AlertCircle; 

  switch (variant) {
    case 'success':
      colorClasses = "bg-green-600/20 border border-green-600 text-green-300";
      Icon = XOctagon; // Just for variation, use XOctagon for success or checkmark
      break;
    case 'info':
      colorClasses = "bg-blue-600/20 border border-blue-600 text-blue-300";
      Icon = AlertCircle;
      break;
    case 'destructive': // This is your primary error style
    default:
      colorClasses = "bg-destructive/10 border border-destructive/70 text-destructive"; // Red error style
      Icon = AlertCircle;
      break;
  }
  const { error } = useDataFetcher('/error');
  
 

  return (
    <div className={cn(baseStyle, colorClasses, className)} role="alert">
      {/* Icon uses the same color as the text */}
      <Icon className="h-6 w-6 flex-shrink-0 mt-0.5" /> 
      
      {/* Message content */}
      <div className="flex-grow">
        <p className="font-semibold">{error}</p>
      </div>
    </div>
  );
};

export default Message;