// import React from 'react'
// import data from '../data'

// const Home = () => {
//   return (
//     <div>
//        <h1>
//        Featured Products
//        </h1>

//        <ul>
//         {data.products.map((product,index) => {
//           return(
//             <div key={product.slug}>
//               <img src={product.image} alt="" />
//               <p>
//                 {product.name}
//               </p>
//               <p>
//                 {product.category}
//               </p>
//             </div>
//           );
//         })}
//        </ul>

//     </div>
//   )
// }

// export default Home

import { useState } from "react";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Category from "../components/Category";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="">
      <div>
        <Hero />
      </div>

      <div className="mt-10">
        <ProductList />
      </div>

      <div className="mt-10">
        <Category />
      </div>

    </div>
  );
}
