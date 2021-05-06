var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("blogs/index", {data:"ข้อมูลบทความ"});
  });
router.get('/add', function(req, res, next) {
    res.render("blogs/addForm", {data:"เพิ่มบทความ"});
});
module.exports = router;
