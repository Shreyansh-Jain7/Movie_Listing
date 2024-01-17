const mongoose=require("mongoose");
const movSchema=mongoose.Schema({
    title:String,
    genre:String,
    rating:Number,
    review:[{user:String,rating:Number}]
},{
    versionKey:false
})

const Movie=mongoose.model("movie",movSchema);

module.exports={Movie};