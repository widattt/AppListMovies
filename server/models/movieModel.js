import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    likes: {
        type: [{type: String}]  
    }
})

export const MovieModel = mongoose.model('Movies', schema)