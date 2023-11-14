import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import Book from "./models/bookModel.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/bookstoredb";

app.get("/", (req, res) => {
  console.log(req, "request");
  return res.status(234).send("Welcome to book store api");
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).send({ message: error.message });
    }

    return res.status(500).send({
      message: "An error occurred while creating the book.",
      error: error.message,
    });
  }
});

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
