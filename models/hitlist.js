const mongoose = require('mongoose')

//mvp schema for first section of the hitlist talble.
//possibly change source to sourceUrl?

const HitlistSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    rolePosition:{
        type: String
    },
    typeOfPosition:{
        type: String
    },
    source:{
        type: String
    },
    userId: {
    type: String,
    required: true
  }
})



module.exports = mongoose.model('Hitlist', HitlistSchema)