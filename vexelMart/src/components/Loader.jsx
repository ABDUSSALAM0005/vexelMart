import React from 'react';
import { cn } from "../components/lib/utils"; // Assuming cn utility is used here

const Loader = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 w-full", className)}>
      {/* Container for the logo/spinner animation */}
      <div className="relative h-12 w-12">
        {/* Outer Ring: Primary (Indigo) */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary border-b-primary/50 border-l-primary/50 animate-spin"
          aria-hidden="true"
        ></div>
        
        {/* Inner Dot/Core: Accent (Emerald) */}
        <div 
          className="absolute inset-2 rounded-full bg-accent animate-pulse"
          aria-hidden="true"
        ></div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-6 text-lg font-heading font-semibold text-muted-foreground animate-pulse">
        Vexel Mart is preparing your inventory...
      </p>
    </div>
  );
};

export default Loader;