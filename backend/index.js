import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const CON = process.env.CONNECT;

app.set("port", PORT);

// Add your middleware
app.use(helmet());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://marj-backend-2-95ad54c21769.herokuapp.com/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

async function connectToDatabase() {
  try {
    await mongoose.connect(CON);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

connectToDatabase();

app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
