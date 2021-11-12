const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const place = req.body.placeName;
    const appid = "f3dcc277a0e3789d1be23b9178bc22c2";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=metric&appid=" + appid;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const parsed = JSON.parse(data);
            const temp = parsed.main.temp;
            const weatherDescription = parsed.weather[0].description;
            const num = parsed.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/" + num + "@2x.png";
            res.write("<p>Weather description is: " + weatherDescription + "</p>");
            res.write("<h1>Temperature in " + parsed.name + " at the moment is " + temp + " deg celcius, However it feels like " + parsed.main.feels_like + " deg celcius.</h1>");
            res.write("<img src=" + image + ">");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server started");
})