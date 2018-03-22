var express=require("express");
var app=express();

var processport = process.env.PROCESS_PORT;

app.get('/',function(req,res){

          res.end("Hello world !");

});

app.listen(processport,function(){

          console.log("Running at PORT " + processport);

});