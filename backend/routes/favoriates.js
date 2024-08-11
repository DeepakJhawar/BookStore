import { Router } from "express";
import User from "../models/user.js";
import autheticateToken from "./userAuth.js";

const router = new Router();

router.put("/add-book-to-favs", autheticateToken, async(req, res)=>{
    try{
        const { bookid, id } = req.headers;
        if (!bookid || !id) {
            return res.status(400).json({ message: "Book ID and User ID are required" });
        }
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        const isBookFav = userData.favs.includes(bookid);
        if(isBookFav){
            return res.status(200).json({message: "Book is already in favoriates"});
        }
        userData.favs.push(bookid);
        await userData.save();
        return res.status(200).json({ message: "Book added to favorites" });
    }catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.put("/remove-book-from-favs", autheticateToken, async(req, res)=>{
    try{
        const { bookid, id } = req.headers;
        if (!bookid || !id) {
            return res.status(400).json({ message: "Book ID and User ID are required" });
        }
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        const isBookFav = userData.favs.includes(bookid);
        if(isBookFav){
            userData.favs.pull(bookid);
            await userData.save();
            return res.status(200).json({message: "Book removed from favoriates"});
        }
        return res.status(404).json({ message: "Book not found in favoriates" });
    }catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.get("/get-favs", autheticateToken, async(req, res)=>{
    try{
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const userData = await User.findById(id).populate('favs');
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ data: userData.favs });
    }catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
});
export default router;