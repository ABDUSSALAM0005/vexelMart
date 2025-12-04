import { Outlet } from "react-router-dom"; // 🚨 ADD THIS LINE BACK! 🚨
import Header from "./Header";

function Layout() {
  return (
    // We removed color/font classes here because the body tag handles it now!
    <div className="relative min-h-screen"> 
      
      {/* NAVBAR ALWAYS ON TOP */}
      <Header />

      {/* PAGE CONTENT */}
      {/* Using max-w-7xl mx-auto for professional centered layout */}
      <div className="pt-10 px-5 max-w-7xl mx-auto"> 
        <Outlet /> 
      </div>

    </div>
  );
}

export default Layout;