import express from "express"
import products from "./data.js"

const app = express()
app.get('/api/products', (req, res) => {
    res.json(products)
})

app.listen(5001,() => {
    console.log("Listening on port 5001");
}) 