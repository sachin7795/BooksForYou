const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Bookpost = require('../models/bookpost');
const Reportedpost = require('../models/reportedpost');

//user sign up
router.post('/usersignup', (req, res, next)=>{
    console.log('signing up a user');
    var newUser = User();
    newUser.name = req.body.name;
    newUser.phone = req.body.phone;
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(req.body.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save((err, insertedUser)=>{
                if(err){
                    console.log('there is an error in saving the user');
                }
                else{
                    res.json(insertedUser);
                }
            });
        });
    });
});

//authenticating user
router.post('/userauthenticate', (req, res, next)=>{
    console.log('finding the user');
    var user = User();
    user.username = req.body.username;
    user.password = req.body.password;
    User.findOne({username : user.username}).exec((err, foundUser)=>{
     if(err){
         console.log('error in getting the user');
     }
     else{
        if(foundUser===null){
            res.json({status : false});
        }else{
        bcrypt.compare(user.password, foundUser.password, (err, ress)=>{
            if(ress===true){
                console.log('user found');
                res.json({status : true, userData : foundUser});   
            }else{
                console.log('user not found');
                res.json({status : false});
            }
        });
     }
    }
    });
});

//checking user username
router.post('/checkuserusername', (req, res, next)=>{
    console.log('checking the username');
    username = req.body.username;
    User.find({username : username}).exec((err, foundUser)=>{
        if(err){
            console.log('error in checking the username');
        }else{
            res.json(foundUser);
        }
    });
});

//Adding a bookpost
router.post('/addbookpost', (req, res, next)=>{
    console.log('adding a bookpost to database');
    var newBookpost = Bookpost();
    newBookpost.name = req.body.name;
    newBookpost.username = req.body.username;
    newBookpost.bookname = req.body.bookname;
    newBookpost.category = req.body.category;
    newBookpost.author = req.body.author;
    newBookpost.description = req.body.description;
    newBookpost.price = req.body.price;
    newBookpost.phone = req.body.phone;
    newBookpost.date = req.body.date;
    newBookpost.save((err, insertedbookpost)=>{
        if(err){
            console.log('there is an error in saving the bookpost');
        }else{
            res.json(insertedbookpost);
        }
    });
});

//getting bookposts
router.get('/bookposts', (req, res, next)=>{
    console.log('getting all the bookposts');
    Bookpost.find({}).exec((err, bookposts)=>{
        if(err){
            console.log('there is an error in retrieving the bookposts');
        }
        else{
            res.json(bookposts);
        }
    });
});

//Reporting a post
router.post('/reportPost', (req, res, next)=>{
    console.log('Reporting a post');
    var newReportedPost = Reportedpost();
    newReportedPost.username = req.body.username;
    newReportedPost.bookname = req.body.bookname;
    newReportedPost.category = req.body.category;
    newReportedPost.author = req.body.author;
    newReportedPost.price = req.body.price;
    newReportedPost.phone = req.body.phone;
    newReportedPost.name = req.body.name;
    newReportedPost.description = req.body.description;
    newReportedPost.date = req.body.date;
    newReportedPost.reporter = req.body.reporter;
    newReportedPost.save((err, reportedpost)=>{
                                    if(err){
                                        console.log('there is an error in reporting the post');
                                    }else{
                                        res.json(reportedpost);
                                    }

    });
});

//getting User bookposts
router.post('/userBookposts', (req, res, next)=>{
    console.log('getting all the user bookposts');
    username = req.body.username;
    Bookpost.find({username : username}).exec((err, userBookposts)=>{
        if(err){
            console.log('there is an error in retrieving the user bookposts');
        }
        else{
            res.json(userBookposts);
        }
    });
});

//finding ads
router.post('/findads', (req, res, next)=>{
    console.log('finding the ads');
    name = req.body.query;
    Bookpost.find({bookname : name}).exec((err, foundads)=>{
        if(err){
            console.log('there is an error in finding the ads');
        }
        else{
            res.json(foundads);
        }
    });
});

//delete user bookpost
router.post('/deleteUserBookpost', (req, res, next)=>{
    console.log('deleting user Bookpost');
    name = req.body.name;
    username = req.body.username;
    description = req.body.description;
    date = req.body.date;
    phone = req.body.phone;
    bookname = req.body.bookname;
    category = req.body.category;
    author = req.body.author;
    price = req.body.price;
    Bookpost.remove({name : name, username : username,
                     description : description,date : date,
                     phone : phone, bookname : bookname, category : category, 
                     author : author, price : price}).exec((err, deletedBookpost)=>{
        if(err){
            console.log('there is an error in deleting the user bookpost');
        }
        else{
            res.json(deletedBookpost);
        }
    });
});

module.exports = router;



















