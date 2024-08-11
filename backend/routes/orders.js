import { Router } from "express";
import User from "../models/user.js";
import Order from "../models/order.js";
import autheticateToken from "./userAuth.js";

const router = Router();

router.post("/place-order", async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    if (!id || !order) {
      return res.status(400).json({ message: "Missing user id or order data." });
    }

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
        $pull: { cart: orderData._id },
      });
    }

    return res.status(200).json({ message: "Order placed." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
});


router.get("/get-order-history", autheticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    if (!id) {
      res.status(404).json({ message: "User Id should be send via headers" });
    }
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    if (!userData) {
      return res.status(404).json({ message: "Userdata not found" });
    }
    const ordersData = userData.orders.reverse();
    console.log(ordersData)
    return res.status(200).json({ data: ordersData });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});

router.get("/get-all-orders", autheticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });

    if (!userData) {
      res.status(404).json({ message: "Userdata not found" });
    }
    return res.status(200).json({ data: userData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});

router.put("/update-status/:id", autheticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Order id is required" });
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
});

export default router;
