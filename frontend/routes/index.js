var express = require('express');
var router = express.Router();
var request = require('request')
var Noty = require('noty');
var rp = require('request-promise')



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

  if(req.session == null){
    res.redirect('/home')
  }

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

async function getCamoJson() {  
  var options = {
      url: 'http://localhost:3020/get'
  };
  return await rp.get(options);
}

router.get('/home',function(req,res,next){


  if(req.sessionID){
  var data = {};
  
    if(req.session.login){
       data.msg =  req.session.login

      delete req.session.login
      const hasil = getAll()
      hasil.then(function(result){
        data.row = result.body;

       res.render('home',{'data' : data});

      })


    }else{
      const hasil = getAll()
        hasil.then(function(result){
          data.msg = sweetalert()
          data.row = result.body;

         res.render('home',{'data' : data});

        })

    }
  }else{
    res.redirect('/')
  }
  
})

router.get('/logout', function(req,res,next){
  req.session.destroy();
  req.session = null;
  console.log(req.session);
  res.redirect('/');
})



router.post('/edit', function(req,res,next){

  var body = req.body;

  var options = {
    method: 'POST',
    uri: 'http://localhost:3020/edit',
    json: true,
    resolveWithFullResponse:true,
    body: {
      id : body.id,
      name : body.name,
      address : body.address,
      email : body.email,
      phone : body.phone
    }
  };
  
  const data =  rp(options)
  
  data.then(function(result){
    
    if(result.body.affectedRows > 0){
      req.session.login = {'status' : 1, alert : sweetalert({"title" : "Update Success","icon" : "success"})}
      res.redirect('/home')
    }else{
      req.session.login = {'status' : 0, alert : sweetalert({"title" : "Update Failed","icon" : "error"})}
      res.redirect('/home')
    }
  })

})


router.post('/delete', function(req,res,next){


  var body = req.body;
  var options = {
    method: 'POST',
    uri: 'http://localhost:3020/delete',
    json: true,
    resolveWithFullResponse:true,
    body: {
      id : body.id
    }
  };
  
  const data =  rp(options)

  data.then(function(result){ 
    
    if(result.body.affectedRows > 0){
      console.log("success")
      req.session.login = {'status' : 1, alert : sweetalert({"title" : "Delete Success","icon" : "success"})}
      res.redirect('/home')
    }else{
      console.log("failed")
      req.session.login = {'status' : 0, alert : sweetalert({"title" : "Delete Failed","icon" : "error"})}
      res.redirect('/home')
    }

    
  })

})


router.post('/add', function(req,res,next){

  var body = req.body;
  console.log(body)
  var options = {
    method: 'POST',
    uri: 'http://localhost:3020/add',
    json: true,
    resolveWithFullResponse:true,
    body: {
      id : body.id,
      name : body.name,
      address : body.address,
      email : body.email,
      phone : body.phone
    }
  };
  
  const data =  rp(options)
  
  data.then(function(result){    
    if(result.body.affectedRows > 0){
      req.session.login = {'status' : 1, alert : sweetalert({"title" : "Insert Success","icon" : "success"})}
      res.redirect('/home')
    }else{
      req.session.login = {'status' : 0, alert : sweetalert({"title" : "Delete Failed","icon" : "error"})}
      res.redirect('/home')
    }
  })

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

const fetch = require('node-fetch');

function getAll(){
  var options = {
    uri: 'http://localhost:3020/get',
    json: true,
    resolveWithFullResponse:true
  };
  
  const data =  rp(options)
  return data;
  
//   const fetch = require("node-fetch");
//   const url = "https://jsonplaceholder.typicode.com/posts/1";
//   const getData = async url => {
//     try {
//       const response = await fetch(url);
//       const json = await response.json();
//      return json;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//  return getData(url);
  
}





module.exports = router;
