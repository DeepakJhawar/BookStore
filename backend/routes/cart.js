import { Router } from "express";
import User from "../models/user.js";
import autheticateToken from "./userAuth.js";

const router = Router();

router.put("/add-to-cart", autheticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    if (!bookid || !id) {
      return res
        .status(400)
        .json({ message: "Book ID and User ID are required" });
    }
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(200).json({ message: "Book is already in cart" });
    }
    userData.cart.push(bookid);
    await userData.save();
    return res.status(200).json({ message: "Book added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/remove-from-cart/:bookid", autheticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookid } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isBookInCart = user.cart.includes(bookid);
    if (!isBookInCart) {
      return res.status(404).json({ message: "Book not found in cart." });
    }
    user.cart.pull(bookid);
    await user.save();
    return res.status(200).json({ message: "Book removed from cart." });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-user-cart", autheticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const userData = await User.findById(id).populate("cart");
    if (!userData) {
      return res.status(404).json({ message: "UserData not found" });
    }
    const data = userData.cart;
    return res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
