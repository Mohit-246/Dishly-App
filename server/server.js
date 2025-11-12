import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB.js";
import userRoutes from "./routes/user.js";
import recipeRoutes from "./routes/recipe.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is Running Fine");
});

app.use("/v4/user", userRoutes);
app.use("/v4/recipe", recipeRoutes);



const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running fine at http://localhost:${PORT}`);
});
