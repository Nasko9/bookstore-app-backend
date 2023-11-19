import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A book must have a title"],
      trim: true,
      maxlength: [
        150,
        "A book title must have less or equal than 150 characters",
      ],
      minlength: [1, "A book title must have more or equal than 1 character"],
    },
    author: {
      type: String,
      required: [true, "A book must have an author"],
      trim: true,
    },
    publishYear: {
      type: Number,
      required: [true, "A book must have a publish year"],
      max: [new Date().getFullYear(), "Publish year cannot be in the future"],
    },
    genres: [
      {
        type: String,
        enum: [
          "Fantasy",
          "Science Fiction",
          "Mystery",
          "Thriller",
          "Non-fiction",
          "Romance",
        ],
        message: "{VALUE} is not a valid genre",
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
