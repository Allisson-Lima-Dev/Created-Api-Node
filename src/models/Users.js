const mongoose = require('../db/db')

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
         required: true// --> como obrigatorio o tipo
    },
    email: {
        type: String,
        required: true
        
    },
    descripition: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post