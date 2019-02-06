/* Copy Static */

var ncp = require('ncp').ncp;

var source = [];
var dest = './public';
source['sweetalert'] = './node_modules/sweetalert';
source['noty'] = './node_modules/noty';

//console.log(source);

for (var k in source){

  ncp(source[k],dest+k, function (err) {
    if (err) {
       console.error(err);
    }else{
      console.log(source[k] + ' done!');
    }
   });

}


/* Delete Custom Script */

const fse = require('fs-extra')

fse.remove('./copy.js');
fse.remove('./delete.js');