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
                      flag: location.country_flag_emoji,
                      lat: data.latitude,
                      long: data.longitude,
                      capital: data.capital
                     };
        // console.dir(result.data)
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
                      flag: location.country_flag_emoji,
                      lat: data.latitude,
                      long: data.longitude,
                      capital: data.capital
                     };
        res.send(ipInfo)
      }
    )
})

// Facts: name, nativeName, capital, population, timezone, currencies[0].name, currencies[0].symbol, languages[0].name, gini 
app.get('/country/:countryName', (req, res)=> {
  let country = ""
  if (req.params.countryName.toLowerCase() == "united states") {
    country = "united states of america"
  } else {
    country = req.params.countryName.toLowerCase();
  }
  let url = 'https://restcountries.eu/rest/v2/name/' + country + "?fullText=true"
  axios.get(url).then(
    (result) => {
      let data = result.data[0]
      // Get currency info
      let currencies = data.currencies
      let currNames = []
      let currSymbols = []
      for (currency in currencies) {
        // console.dir(currencies[currency].name);
        currNames.push(currencies[currency].name);
        currSymbols.push(currencies[currency].symbol);
      }
      // Get languages
      let languages = data.languages
      let langData = []
      for (language in languages) {
        langData.push(languages[language].name);
      }
      // Format numbers
      let popnum = data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // Data Array
      let dataArr = [];
      dataArr.push({
        name: data.name,
        nativeName: data.nativeName,
        capital: data.capital,
        population: popnum,
        currencyName: currNames,
        currencySymbols: currSymbols,
        languages: langData,
        gini: data.gini
      })
      res.send(dataArr[0])
    }
  )
})

// Facts: name, nativeName, capital, population, timezone, currencies[0].name, currencies[0].symbol, languages[0].name, gini 
app.get('/country', (req, res)=> {
  let url = 'https://restcountries.eu/rest/v2/name/' + "philippines"
  axios.get(url).then(
    (result) => {
      let data = result.data[0]
      // Get currency info
      let currencies = data.currencies
      let currNames = []
      let currSymbols = []
      for (currency in currencies) {
        // console.dir(currencies[currency].name);
        currNames.push(currencies[currency].name);
        currSymbols.push(currencies[currency].symbol);
      }
      // Get languages
      let languages = data.languages
      let langData = []
      for (language in languages) {
        langData.push(languages[language].name);
      }
      // Data Array
      let dataArr = [];
      dataArr.push({
        name: data.name,
        nativeName: data.nativeName,
        capital: data.capital,
        population: data.population,
        currencyName: currNames,
        currencySymbols: currSymbols,
        languages: langData,
        gini: data.gini
      })
      res.send(dataArr[0])
    }
  )
})