const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookpostSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    bookname : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('bookpost', bookpostSchema, 'bookadds');