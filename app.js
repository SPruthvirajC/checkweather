const express = require ("express");
const https= require("https")
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({extended: true}))

//to get index.html data
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    console.log(req.body.cityName)
    const query = req.body.cityName ;
    const apiKey ="c250d94129913d0b60da9b9105538124";
    const metric ="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+ metric;
    https.get(url, function(response){
        console.log(response.statusCode)

    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const feelsLike = weatherData.main.feels_like
        const  description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        
        console.log(temp, "feels like "+feelsLike, description, icon)
        res.write(" <p>weather description   is " +description +'</p>' )
        res.write(" <h1>Current Temprature in "+ query +  " is "+  temp  + ' degree celsius</h1>' )
        res.write("<img src="+ imageUrl +">")
        res.send()
        
    })
    })
})


    
   
app.listen( 3000, function(){
    console.log("server is online")
})