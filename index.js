const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/blog", postRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
