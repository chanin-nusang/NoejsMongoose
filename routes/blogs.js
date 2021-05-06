var express = require('express');
var router = express.Router();
const Blogs = require('../models/blogs');
const { check, validationResult } = require('express-validator');

router.get('/', function (req, res, next) {
    Blogs.getAllBlogs(function (err, blogs) {
        if (err) throw err
        res.render("blogs/index", { data: "ข้อมูลบทความ", blogs: blogs });
    });
});
router.get('/add', function (req, res, next) {
    res.render("blogs/addForm", { data: "เพิ่มบทความ" });
});
router.get('/delete/:id', function (req, res, next) {
    console.log("FIND ID",req.params.id);
    Blogs.deleteBlog([req.params.id],function(err){
        if(err) throw err
        console.log("DELETE COMPLETE");
        res.redirect("/blogs")
    })
});
router.get('/edit/:id', function (req, res, next) {
    console.log("FIND ID",req.params.id);
    Blogs.getBlogId([req.params.id],function(err,blog){
        if(err) throw err
        res.render("blogs/editForm",{data:"แก้ไขบทความ", blog:blog})
    })
});
router.post('/add', [
    check('title', 'กรุณาป้อนชื่อบทความ').not().isEmpty(),
    check('author', 'กรุณาป้อนชื่อผู้แต่ง').not().isEmpty(),
], function (req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    for (var key in errors) {
        console.log(errors[key].value);
    }
    if (!result.isEmpty()) {
        //response validate data to register.ejs
        res.render("blogs/addForm", { data: "เพิ่มบทความ", errors: errors });
    } else {
        var data = new Blogs({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category
        })
        console.log(req.body.title);
        console.log(req.body.author);
        console.log(req.body.category);
        Blogs.createblog(data, function (err, callback) {
            if (err) console.log(err);
            res.redirect("/blogs")
        })
    }

});
router.post('/update', [
    check('title', 'กรุณาป้อนชื่อบทความ').not().isEmpty(),
    check('author', 'กรุณาป้อนชื่อผู้แต่ง').not().isEmpty(),
], function (req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    for (var key in errors) {
        console.log(errors[key].value);
    }
    if (!result.isEmpty()) {
        //response validate data to register.ejs
        res.redirect("/blogs");
    } else {
        var data = new Blogs({
            id:req.body.id,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category
        })
        console.log(req.body.title);
        console.log(req.body.author);
        console.log(req.body.category);
        Blogs.updateBlog(data, function (err, callback) {
            if (err) console.log(err);
            res.redirect("/blogs")
        })
    }

});

module.exports = router;
