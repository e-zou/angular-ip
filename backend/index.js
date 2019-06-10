require('dotenv').config({ path: '../.env' });
const express  =  require('express');
const cors = require('cors');
const bodyParser  =  require('body-parser');
const axios = require('axios');
const port = 5000;


const API_KEY = process.env.ANGULAR_API_KEY;

const  app  =  express();
const  router  =  express.Router();
app.use(cors());
router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// http://api.ipstack.com/134.201.250.155
//     ? access_key = YOUR_ACCESS_KEY
// // optional parameters: 

//     & fields = ip,location,security
//     & hostname = 1
//     & security = 1
//     & language = en
//     & callback = MY_CALLBACK
//     & output = json

app.get('/ip/:ipAddress', (req, res) => {
    let url = "http://api.ipstack.com/" + req.params.ipAddress + "?access_key=" + API_KEY;
    axios.get(url).then(
      (result) => {
        let data = result.data;
        let location = data.location;

        let ipInfo = {ip : data.ip, 
                      city: data.city,
                      region: data.region_name,
                      country: data.country_name,
                      zip: data.zip,
                      capital: location.capital,
                      flag: location.country_flag_emoji
                     };
        console.dir(result.data)
        res.send(ipInfo)
        
      }
    )
})

app.get('/ip', (req, res) => {
    let url = "http://api.ipstack.com/check?access_key=" + API_KEY;
    axios.get(url).then(
      (result) => {
        let data = result.data;
        let location = data.location;

        let ipInfo = {ip : data.ip, 
                      city: data.city,
                      region: data.region_name,
                      country: data.country_name,
                      zip: data.zip,
                      capital: location.capital,
                      flag: location.country_flag_emoji
                     };
        res.send(ipInfo)
      }
    )
})

// require('dotenv').config({ path: './../.env' });
// const API_KEY = process.env.ANGULAR_API_KEY;

// var axios = require('axios');
// var express = require('express');
// var cors = require('cors');
// var app = express();


// // Then use it before your routes are set up:
// app.use(cors());

// const port = process.env.PORT || 5000


// app.get('/ip', function(req, res) {
//     let url = "http://api.ipstack.com/199.111.227.155?access_key=" + API_KEY;
//     axios.get(url).then(respond => {
//        console.dir(respond.data)
//        res.send(respond.data)
//     })
// });

// app.listen(port, () => console.log(API_KEY))