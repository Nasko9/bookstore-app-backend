// Modules
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
// Middlewares
import { corsMiddleware } from "./middleware/corsConfig";
import { sessionMiddleware } from "./middleware/sessionConfig";
import passport from "./middleware/passportConfig";
// Routes
import bookRoute from "./routes/bookRoute";
import userRoute from "./routes/userRoutes";

// Configurations
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/bookstoredb";

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(corsMiddleware);
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Todo: add midleware for handling error

// Routes
app.get("/", (req: Request, res: Response) => {
  console.log(req, "request");
  return res.status(234).send("Welcome to book store api");
});

app.use("/user", userRoute);
app.use("/books", bookRoute);

// Database and Server Initialization
(async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("App connected to database");

    app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
})();
