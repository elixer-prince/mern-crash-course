import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);

connectDB().then(() => {
    app.listen(PORT, async () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});


