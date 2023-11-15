import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import bookRoute from "./routes/booksRoute.js";

dotenv.config();

const app = express();

app.use(helmet());

// Middleware for parsing request body
app.use(express.json());
// Middleware for handling CORS policy
app.use(
  cors({
    origin: "*",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    allowHeaders: ["Content-Type,Authorization"],
  })
);

// Todo: add midleware for handling error
// Todo: comment and separate all logic

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/bookstoredb";

app.get("/", (req, res) => {
  console.log(req, "request");
  return res.status(234).send("Welcome to book store api");
});

app.use("/books", bookRoute);

(async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("App connected to database");

    app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
})();
