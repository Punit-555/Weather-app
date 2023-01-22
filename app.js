const express = require("express");
const https = require("https"); 
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true})); 

app.get("/",function(req,res){ 
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  let query = req.body.cityName;
  const apiKey = "6b3eba60e47db87166821d035da1f485";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit + "&lang="  + "&appid=" + apiKey;

  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
     
      const weatherData = JSON.parse(data);
      const temprature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description    
      //weather is an array :
      const icon = weatherData.weather[0].icon; 
      const imgURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
      res.write("<h1>The weather is currently :" + weatherDescription + "</h1>");
      res.write("<p>The weather is currently in " + query + " is " + temprature + " degree Celsius.</p>");
      res.write("<img src= "+ imgURL + ">");
      res.send();
    });
  });
});

app.listen(8080,function(){
  console.log("Server is running on port.");
} ); 
