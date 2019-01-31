var express = require('express');
var router = express.Router();


var Noty = require('noty');

/* GET home page. */
router.get('/', function(req, res, next) {



  res.render('index');
});

router.post('/',function(req, res) {
  var body = req.body;
  var sess;
  
  if(body.username !== "admin" && body.password !== "admin"){
    var sw = swal("Oops!", "Something went wrong!", "error");
    res.render('index',{'status' : 0, 'msg' : 'Login Failed', 'sw' : sw});
  }else{
    var sw = swal("Sucess!", "Login!", "error");
    sess = {'user' : body.username, 'date' : new Date() };
    req.session.user = sess;
    //res.render('home',{'status' : 1, 'msg' : 'Login Sucessful', 'sw' : sw});
    req.session.login = {'status' : 1, 'msg' : 'Login Sucessful', 'sw' : sw};
    res.redirect('/home')
  }
});


router.get('/home',function(req,res,next){
  console.log('My Sesssion : ' + req.sessionID);
  var message = req.session.login;
  delete req.session.login;
  res.render('home',message);
})

router.get('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/');
})


module.exports = router;
