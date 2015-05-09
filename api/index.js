var express = require('express');

var app = express();
var port = process.env.PORT || 8000;


app.use(express.static(__dirname + '/../frontend/public'));
app.use('/ghosts', require('./routes/ghosts'));

app.listen(port, function () {
  console.log("app is listening on " + port);
});
