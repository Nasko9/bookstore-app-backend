import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
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

router.get("/", async (_req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "TThere was an error processing your request.",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "There was an error processing your request.",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (!updateData.title || !updateData.author || !updateData.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "There was an error processing your request.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "There was an error processing your request.",
      error: error.message,
    });
  }
});

export default router;
