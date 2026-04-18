
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import carRouter from "./routes/carRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= DB =================
connectDB();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// allow images across ports
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC UPLOADS =================
// uploads folder is directly inside backend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ROUTES =================
app.use("/api/auth", userRouter);
app.use("/api/cars", carRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);

// ================= TEST =================
app.get("/api/ping", (req, res) =>
  res.json({
    ok: true,
    time: Date.now(),
  })
);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`✅ Server Started on http://localhost:${PORT}`);
});
