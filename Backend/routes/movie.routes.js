const express=require("express");
const {Movie}=require("../models/movie.model");
const movRouter=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {User}=require("../models/user.model");

movRouter.get("/", async(req,res)=>{
    try {
        const movs=await Movie.find();
        res.status(200).send(movs);
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

movRouter.post("/",async(req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;
    const {title,genre,rating}=req.body;
    try {
        const user=await User.find({_id});
        if(user.length>0){
            const movie=new Movie({title,genre,rating,review:[{"user":_id,"rating":rating}]});
            await movie.save();
            res.status(201).send({"msg":"movie has been added"});
        }else{
            res.status(400).send({"msg":"You have to login to add a movie"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

movRouter.patch("/:id",async(req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;
    const rate=req.body.rate;
    try {
        const user=await User.find({_id});
        if(user.length>0){
            const movie=await Movie.find({_id:req.params.id});
            let review=movie[0].review;
            review.push({"user":_id,"rating":rate});
            let totrat=0;
            for(i=0;i<review.length;i++){
                totrat+=review[i].rating;
            }
            let rating=totrat/review.length;
            await Movie.findByIdAndUpdate({_id:req.params.id},{rating,review});
            res.status(200).send({"msg":"movie has been updated"});
        }else{
            res.status(400).send({"msg":"You have to be logged in to rate a movie"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }

})

movRouter.delete("/:id",async(req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;

    try {
        const user=await User.find({_id});
        if(user.length>0){
            const movie=await Movie.find({_id:req.params.id});
            if(movie[0].review[0].user===_id){
                await Movie.findByIdAndDelete({_id:req.params.id});
                res.status(204).send({"msg":"movie has been deleted"});
            }else{
                res.status(400).send({"msg":"You can only delete the moview you have added"});
            }
        }else{
            res.status(400).send({"msg":"You have to be logged in to delete a movie"});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})


module.exports={movRouter};