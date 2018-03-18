const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportedbookpostSchema = new Schema({
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
    price : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    reporter : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('reportedbookPost', reportedbookpostSchema, 'reportedbookpost');