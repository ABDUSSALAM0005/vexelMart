import Product from "../models/productModel.js";
import data from "../data.js"

export async function insertProducts(req, res) {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts })
}

export async function getProducts(req, res) {
    try{
        // 1. Check if there is a 'keyword' in the URL query
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword, // Search for this word
            $options: "i",             // "i" means case-insensitive (iPhone = iphone)
          },
        }
      : {}; // If no keyword, search for everything {}

        const products = await Product.find({ ...keyword }).sort({ createdAt: -1 });
        res.status(200).json(products);

    } catch (error) {
        console.error("Error", error)
        res.status(500).json({ message: "Internal server error"});
    }
    // res.status(200).send(data.products);
}

export async function getProductsById(req, res) {
  try {
    const { id } = req.params
    const product = await Product.findById(id);
    if(!product) return res.status(404).json({ message:"Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getProductsBySlug(req, res) {
    try{
        const product = await Product.findOne({ slug: req.params.slug });
        if(!product) return res.status(404).json({ message: "Product not found"});
        res.status(200).json(product);
    } catch(error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal server error"})
    }
}
// @desc    Create a sample product (Draft)
// @route   POST /api/products
// @access  Private/Admin
// @desc    Create a sample product (Draft)
// @route   POST /api/products/create
// @access  Private/Admin
export const createProducts = async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample Name ' + Date.now(),
      // 1. ADD SLUG (Required)
      slug: 'sample-name-' + Date.now(), 
      price: 0,
      user: req.user._id,
      image: 'https://placehold.co/600x400',
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
      // 2. ADD RATING (Required)
      rating: 0, 
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export async function updateProducts(req, res) {
    try {
        const { name, price, slug, image, brand, category, description, countInStock, rating, numReviews } = req.body;
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, slug, image, brand, category, description, countInStock, rating, numReviews },
            // { new: true }
        );
         if (!updatedProduct)
        return res.status(404).json({ message: " Product not found" });
         else{
        return res.status(200).json(updatedProduct);
    }

    } catch (error) {
        console.error("Error in updateProducts controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function deleteProducts(req, res) {
 try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
 } catch (error) {
    console.error("Error in deleting", error);
    res.status(500).json({ message: "Internal server error" });
 }}
