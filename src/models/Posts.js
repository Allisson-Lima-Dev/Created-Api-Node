const mongoose = require('../db/db')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
         required: true// --> como obrigatorio o tipo
    },
    content: {
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