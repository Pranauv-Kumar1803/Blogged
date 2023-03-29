const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    dateTime:{
        type: Date,
        required:true
    },
    idee:Number,
    editor:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:false
    },
    mainImage:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Blog',blogSchema);