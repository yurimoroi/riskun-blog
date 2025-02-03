import express from "express";
import cors from "cors";
import blogRoutes from "./routes/getBlogs";

const app = express();
app.use(cors());

// ルートの登録
app.use("/api/blogs", blogRoutes);

export default app;
