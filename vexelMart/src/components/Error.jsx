import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation
import { AlertTriangle } from 'lucide-react'; // Icon for visual cue

export default function ErrorPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8 relative overflow-hidden">
      
      {/* Background Glow Effect (Similar to Homepage) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.1rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-accent to-primary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1rem]"
        />
      </div>

      <div className="text-center relative z-10">
        <div className="flex justify-center mb-6">
            <div className="bg-card/50 p-4 rounded-full border border-border backdrop-blur-sm">
                <AlertTriangle className="h-12 w-12 text-destructive animate-pulse" />
            </div>
        </div>
        
        <p className="text-base font-bold font-heading text-primary">404 Error</p>
        
        <h1 className="mt-4 text-5xl font-bold font-heading tracking-tight text-foreground sm:text-7xl">
          Page not found
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-md mx-auto">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted from our inventory.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform hover:-translate-y-1"
          >
            Go back home
          </Link>
          
          <Link 
            to="/contact" 
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            Contact Us <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}