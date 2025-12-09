// // const products = [
// //   {
// //     id: 1,
// //     name: 'Basic Tee',
// //     href: '#',
// //     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
// //     imageAlt: "Front of men's Basic Tee in black.",
// //     price: '$35',
// //     color: 'Black',
// //   },
// //   {
// //     id: 2,
// //     name: 'Basic Tee',
// //     href: '#',
// //     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
// //     imageAlt: "Front of men's Basic Tee in white.",
// //     price: '$35',
// //     color: 'Aspen White',
// //   },
// //   {
// //     id: 3,
// //     name: 'Basic Tee',
// //     href: '#',
// //     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
// //     imageAlt: "Front of men's Basic Tee in dark gray.",
// //     price: '$35',
// //     color: 'Charcoal',
// //   },
// //   {
// //     id: 4,
// //     name: 'Artwork Tee',
// //     href: '#',
// //     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
// //     imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
// //     price: '$35',
// //     color: 'Iso Dots',
// //   },
// // ]

// import data from "../data"

// export default function Example() {
//   return (
//     <div className="">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2 className="text-2xl font-bold tracking-tight text-primary">List of our products</h2>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {data.products.map((product) => (
//             <div key={product.id} className="group relative bg-card  shadow-xl rounded-2xl">
//               <img
//                 alt={product.imageAlt}
//                 src={product.imageSrc}
//                 className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
//               />
//               <div className="mt-4 p-2 flex justify-between">
//                 <div>
//                   <h3 className="text-sm text-white">
//                     <a href={product.href}>
//                       <span aria-hidden="true" className="absolute inset-0" />
//                       {product.name}
//                     </a>
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//                 </div>
//                 <p className="text-3xl font-large text-primary">{product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

import data from "../data"
import { motion } from "framer-motion"

export default function ProductsGrid() {
  return (
    <div className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Our Products
          </h2>

          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </a>
        </div>

        {/* GRID */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-card/40 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              {/* Image Wrapper */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-2xl">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-90"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-primary/80 hover:bg-primary rounded-xl shadow">
                    View
                  </button>
                  <button className="px-4 py-2 text-sm font-medium bg-white text-primary hover:bg-gray-100 rounded-xl shadow">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-primary transition">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {product.color}
                </p>

                <p className="text-2xl font-bold text-primary mt-3">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

