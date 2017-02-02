var express = require("express");
var app = express();
var path = require('path');

app.get('/', function(req, res) {//this is how you send/show html file?
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/:time',function(req,res){
    
    function unixToNatural(unix) {
        var date = new Date(unix * 1000);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month = months[date.getMonth()];
        var day = date.getDay();
        var year = date.getFullYear();
        var result = month + ' ' + day + ' ' + year;
        return result;
    }
    
    if(!isNaN(req.params.time)){//isNaN= is Not a Number // !isNaN= it's a number
        var result = unixToNatural(req.params.time);
        var data = {"unix": req.params.time,"natural":result};
        res.json(data);
    }else{
        var natural = new Date(req.params.time);
        if(!isNaN(natural)){
            var unix = natural/2;
            var data = {"unix": unix,"natural":req.params.time};
            res.json(data);
        }else{
            res.json({"unix": null,"natural":null});
        }
    }
});

var port = 8080;
app.set('port',(process.env.port || port));
app.listen(app.get('port'), function () {
  console.log('app listening on port ' + port + '!');
})