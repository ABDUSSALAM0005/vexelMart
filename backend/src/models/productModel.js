// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         slug: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         image: {
//             type: String,
//             required: true,
//         },
//         brand: {
//             type: String,
//             required: true,
//         },
//         category: {
//             type: String,
//             required: true,
//         },
//         description: {
//             type: String,
//             required: true,
//         },
//         price: {
//             type: Number,
//             required: true,
//         },
//         countInStock: {
//             type: Number,
//             required: true,
//         },
//         rating: {
//             type: Number,
//             required: true,
//         },
//         numReviews: {
//             type: Number,
//             required: true,
//         },
//     },
//     {
//         timestamps: true
//     }
// );

// const Product = mongoose.model('Product', productSchema);
// export default Product;

import mongoose from "mongoose";

// 1. Create a Schema specifically for the Review
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // 1 to 5
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    
    // 2. Add these three fields
    reviews: [reviewSchema], // The array of review objects
    rating: { type: Number, required: true, default: 0 }, // Average (e.g., 4.5)
    numReviews: { type: Number, required: true, default: 0 }, // Count (e.g., 10)
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;