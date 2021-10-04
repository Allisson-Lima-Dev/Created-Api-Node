const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    
}).then(() => {
    console.log('mongo connected')
}).catch((err) => {
    console.log(`deu algo errado ${err}`)
})

module.exports = mongoose