import { connectDB } from "./config/db.js";
import express from "express"
import Routes from "./routes/Routes.js";
import userRoutes from './routes/userRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from "cors"
import dotenv from 'dotenv'
import path from "path"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production") {
app.use(cors ({
    origin: "http://localhost:5173"
}))
}

//our simple custom middleware
app.use((req,res,next) => {
    console.log(`Req method ${req.method} & Req URL is ${req.url}`);
    next();
});

//Required
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", Routes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("api/orders", orderRoutes)

// if (process.env.NODE_ENV === "production") {
//   app.use(
//     express.static(
//       path.join(__dirname, "../vexelMart/dist")
//     )
//   );

//   app.get("/.*", (req, res) => {
//     res.sendFile(
//       path.join(__dirname, "../vexelMart/dist/index.html")
//     );
//   });
// }
 
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log('Listening on port',PORT);
});

})