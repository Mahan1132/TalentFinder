import express from "express"; //in module format
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

//Helps read json file data
app.use(express.json());

app.use("/api/auth", authRoutes); //Prefix all Route
app.use("/api/user", userRoutes);

export default app;
