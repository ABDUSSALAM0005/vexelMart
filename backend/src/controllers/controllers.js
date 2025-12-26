import Product from "../models/productModel.js";
import data from "../data.js"

export async function insertProducts(req, res) {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts })
}

export async function getProducts(req, res) {
    try{
        const products = await Product.find().sort({ createdAt: -1 });
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
export async function createProducts(req, res) {
    try {
        const { name, slug, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        const product = new Product({ name, slug, image, brand, category, description, price, countInStock, rating, numReviews })

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }   
}
export async function updateProducts(req, res) {
    try {
        const { name, slug, image, brand, category, description, countInStock, rating, numReviews } = req.body;
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, slug, image, brand, category, description, countInStock, rating, numReviews },
            { new: true }
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
