import express from "express";
import userRouter from "./routes/userRoutes.js";
import partRouter from "./routes/partsRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

//Using Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Setup
const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
};

app.use(cors(corsOptions));

//Using routes after express.json
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/part", partRouter);
// app.use("/api/v1/project", partRouter);

app.get("/", (res, req) => {
  res.send("Nice Working");
});

//Using Error Middleware
app.use(errorMiddleware);
