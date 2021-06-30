const express= require('express');

var router = express.Router();

router.get('/',function(req, res){
 res.render('welcome')
 console.log('index runniing');
});

module.exports = router;