import express from "express"
import Routes from "./routes/Routes.js";
import cors from "cors"

const app = express()

app.use(cors ({
    origin: "http://localhost:5173"
}))

app.use("/api/products", Routes);
 
app.listen(5001,() => {
    console.log("Listening on port 5001");
}) 