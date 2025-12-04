import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Input } from '../components/ui/input'; 
import VexelMartLogo from "../assets/img/VexelMartLogo";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Button } from "./ui/button";

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

const MobileNav = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="flex justify-center items-center">
          <Menu className="text-4xl  cursor-pointer" />
        </SheetTrigger>

        <SheetContent>
          <motion.div>
            {/*Logo*/}
            <SheetTitle className="mt-32 mb-40 text-center text-2xl">
              <NavLink className="flex justify-center" to="/">
                <span>
                  <VexelMartLogo className="h-7 w-auto" />
                </span>

                <h1 className="font-semibold text-primary">VEXEL MART</h1>
              </NavLink>
            </SheetTitle>

           
              <div className="flex justify-end relative bottom-20 ">
        <div className="flex  relative w-auto"> {/* Show full search input only on extra large screens */}
            <Search className="absolute left-3 top-5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-10 h-9 bg-background border-border rounded-full" 
            />
            <Button className="relative right-9 h-9 rounded-full">
                Search
            </Button>
          </div>
            </div>
          

            <SheetHeader>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="flex flex-col justify-center items-center gap-8"
              >
                {Links.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `capitalize relative transition-all duration-300 ease-in-out hover:text-primary hover:scale-105 ${
                          isActive ? "text-primary" : "text-white"
                        } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </SheetHeader>
          </motion.div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
