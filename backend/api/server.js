var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
 
app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000');
});

