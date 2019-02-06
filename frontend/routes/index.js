var express = require('express');
var router = express.Router();
var request = require('request')
var Noty = require('noty');




/* MYSQL */

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'crud'
});



/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.session.login){
    var msg =  req.session.login
  }else{
    var msg = null
  }
  res.render('index',{'data' : msg});
  
  
});

router.post('/',function(req, res) {
  var body = req.body;
  var parameter = {}

  parameter.username = body.username
  parameter.password = body.password

  var hasil = request.post({url: 'http://localhost:3010/login',form: (parameter)},function(err,response,body){

  if(err){
    console.log("error : " + err)
  }

  if(JSON.parse(response.body).length == 0){
    console.log("salah")
    req.session.login = {'status' : 0, alert : sweetalert({"title" : "Login Failed","icon" : "error"})};
    res.redirect('/')
  }else{
    sess = {'user' : body.username, 'date' : new Date() };
    req.session.user = sess;
    req.session.login = {'status' : 1, alert : sweetalert({"title" : "Login Success","icon" : "success"})};
    res.redirect('/home')
  }

  });
});


router.get('/home',function(req,res,next){

  if(req.sessionID){

    if(req.session.login){
      var msg =  req.session.login
      delete req.session.login
    }else{
      var msg = sweetalert()
    }
  }else{
    res.redirect('/')
  }


  res.render('home',{'data' : msg});
})

router.get('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/');
})

function sweetalert(alert = {'title' : null, 'text' : null, 'icon' : null}){
  
  var swal = {'title' : null, 'text' : null, 'icon' : null};
  
  if(alert.hasOwnProperty('title')){
    swal.title = alert.title;
  }
  
  if(alert.hasOwnProperty('text')){
    swal.text = alert.text;
  }
  
  if(alert.hasOwnProperty('icon')){
    swal.icon = alert.icon;
  }
  return swal;
  
}


function postLogin(result){

}




module.exports = router;
