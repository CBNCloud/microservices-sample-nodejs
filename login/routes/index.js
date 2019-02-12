var express = require('express');
var router = express.Router();
const mysql =require('mysql') 


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'crud'
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', function(req,res,next){
  
let query = conn.query("select * from login where username = ? and password = ? ",[req.body.username,req.body.password],function(err, results){

  if(err) throw err;

  res.json(results)
})

});



module.exports = router;
