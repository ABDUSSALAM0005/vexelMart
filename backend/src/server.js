import express from "express"
import Routes from "./routes/Routes.js";
import products from "./data.js"

const app = express()

app.use("/api/products", Routes);
 
app.listen(5001,() => {
    console.log("Listening on port 5001");
}) 