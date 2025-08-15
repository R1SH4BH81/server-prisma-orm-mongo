import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.unsubscribe("/blog", postRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
