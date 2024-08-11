import { Router } from "express";
import User from "../models/user.js";
import Book from "../models/book.js";
import autheticateToken from "./userAuth.js";

const router = Router();

router.post("/add-book", autheticateToken, async (req, res) => {
  const { id } = req.headers;
  const user = await User.findById(id);
  if (user.role !== "admin") {
    return res
      .status(400)
      .json({ message: "You don't have access to admin privileges." });
  }
  try {
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    return res.status(200).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-book", autheticateToken, async (req, res) => {
  try {
    const bookId = req.headers["bookid"];

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const updateFields = {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    };

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateFields, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete", autheticateToken, async (req, res) => {
  try {
    const bookId = req.headers["bookid"];
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book Deleted Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      data: books,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({
      data: books,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-book-by-id/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({data: book});
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
    }
})
export default router;
