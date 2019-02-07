var express = require('express');
var router = express.Router();




var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'crud'
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/get', function(req, res, next) {
  
  connection.query("select * from list",function(err,result){
    
    if(err) throw err;
    
    res.json(result)
    
  });
  
});

router.get('/edit', function(req, res, next) {
  
  var name = req.body.name
  var email = req.body.email
  var address = req.body.address
  var phone = req.body.phone
  var id = req.body.id

  connection.query("update list set name=?,email=?,address=?,phone=? where id=?",[name,email,address,phone,id],function(err,result){
    
    if(err) throw err;
    
    res.json(result)
    
  });
  
});

router.get('/delete', function(req, res, next) {
  
  var id = req.body.id

  connection.query("delete from list where id=?",[id],function(err,result){
    
    if(err) throw err;
    
    res.json(result)
    
  });
  
});



module.exports = router;
