import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.js";
import bookRoutes from "./routes/book.js";
import favRoutes from "./routes/favoriates.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import cors from "cors";

(async () => {
  const connection = await import('./connection/connection.js');
})();

const app = express();
app.use(express.json());
app.use(cors());
// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", favRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
