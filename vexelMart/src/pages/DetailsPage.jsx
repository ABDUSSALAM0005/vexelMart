// import React from 'react'
// import useDataFetcher from '../hooks/useDataFetcher'
// import { useParams } from 'react-router-dom'
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import Rating from '../components/Rating';

// const DetailsPage = () => {
//     const { slug } = useParams();
//     const { products, isLoading, error } = useDataFetcher(`/products/${slug}`);
//       if (isLoading) {
//         return <Loader />; // ✅ BEST LOCATION
//       } else if (error) {
//         return <Message />;
//       }

// return (
//   <div className="bg-background">
//     <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//         {/* === IMAGE SECTION === */}
//         <div className="flex justify-center">
//           <img
//             src={products.imageSrc}
//             alt={products.imageAlt}
//             className="w-full max-w-md rounded-xl object-cover shadow-lg"
//           />
//         </div>

//         {/* === PRODUCT INFO === */}
//         <div className="flex flex-col gap-6">

//           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
//             {products.name}
//           </h1>

//           <p className="text-3xl font-semibold text-primary">
//             {products.price}
//           </p>

//           {/* === RATING === */}
//           <div className="flex items-center gap-2">
//             {/* <div className="flex">
//               {[0, 1, 2, 3, 4].map((rating) => (
//                 <StarIcon
//                   key={rating}
//                   className={classNames(
//                     reviews.average > rating ? 'text-yellow-400' : 'text-muted-foreground',
//                     'h-5 w-5'
//                   )}
//                 />
//               ))}
//             </div> */}
//             <Rating/>
//             {/* <span className="text-sm text-muted-foreground">
//               ({reviews.totalCount} reviews)
//             </span> */}
//           </div>

//           {/* === DESCRIPTION === */}
//           <p className="text-sm text-muted-foreground leading-relaxed">
//             {products.description}
//           </p>

//           {/* === COLORS === */}
//           <div>
//             <h3 className="text-sm font-medium mb-2">Color</h3>
//             <div className="flex gap-3">
//               {products.colors.map((color) => (
//                 <label key={color.id} className="relative cursor-pointer">
//                   <input
//                     type="radio"
//                     name="color"
//                     className="peer sr-only"
//                     defaultChecked={color === product.colors[0]}
//                   />
//                   <span
//                     className={classNames(
//                       color.classes,
//                       'h-8 w-8 rounded-full border peer-checked:ring-2 ring-primary'
//                     )}
//                   />
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* === SIZES === */}
//           <div>
//             <h3 className="text-sm font-medium mb-2">Size</h3>
//             <div className="grid grid-cols-4 gap-3">
//               {products.sizes.map((size) => (
//                 <button
//                   key={size.name}
//                   disabled={!size.inStock}
//                   className={classNames(
//                     size.inStock
//                       ? 'border hover:bg-primary hover:text-white'
//                       : 'opacity-40 cursor-not-allowed',
//                     'rounded-md border px-3 py-2 text-sm font-medium transition'
//                   )}
//                 >
//                   {size.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* === CTA === */}
//           <button
//             className="mt-6 w-full rounded-lg bg-primary py-3 text-white font-semibold hover:bg-primary/90 transition"
//           >
//             Add to Cart
//           </button>

//         </div>
//       </div>
//     </div>
//   </div>
// )

// }

// export default DetailsPage

import { useParams, useNavigate } from "react-router-dom";
import useDataFetcher from "../hooks/useDataFetcher";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { Button } from "../components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { Badge } from "../components/ui/badge";
import AddToCartButton from "../components/AddToCartButton";

export default function DetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { products: product, isLoading, error } = useDataFetcher(`/products/slug/${slug}`);

  if (isLoading) {
    return <Loader />; // ✅ BEST LOCATION
  } else if (error) {
    return <Message />;
  }

  if (!product) return <Message />;

  return (
    <div className="bg-background py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 bg-card/40 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-10 shadow-xl">
        <Button onClick={() => navigate(-1)} className="mb-8 rounded-xl">
          <ArrowBigLeft />
          Go Back
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* IMAGE SECTION */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md aspect-square overflow-hidden rounded-2xl bg-black/10">
              <img
                src={product.image}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col gap-6">
            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <Rating
                rating={product.rating || 4}
                numReviews={product.numReviews || 120}
              />
            </div>

            {/* PRICE */}
            <p className="text-3xl font-bold text-primary">${product.price}</p>
            <p className="text-3xl font-bold text-primary">
              {product.countInStock > 0 ? (
                <Badge variant="secondary">
                  {product.countInStock} In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Unavailable</Badge>
              )}
            </p>

            {/* COLOR */}
            <div className="text-sm text-muted-foreground">
              Color: <span className="text-white">{product.color}</span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm leading-relaxed text-muted-foreground max-w-prose">
              Premium quality product crafted for comfort and durability.
              Perfect for everyday wear with a modern, stylish finish.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-4">
              <AddToCartButton
                className="flex-1"
                product={product}
              />
              <button className="flex-1 rounded-xl border border-white/20 text-white hover:bg-primary/10 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
