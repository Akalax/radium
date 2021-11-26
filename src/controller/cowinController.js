const axios = require("axios");

const getWeather = async function (req, res) {
  try {
    let city = req.query.city;
    let id = req.query.APPID;
    let arr = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
    let arrofObject = [];
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let obj = { city: arr[i] }
      let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${arr[i]}&APPID=e5fef1a1a81352486ed07a9f336c1fb1`)
      obj.temp = response.data.main.temp;
      arrofObject.push(obj);
    }
    let increasingTempOrder = arrofObject.sort(function (a, b) { return a.temp - b.temp });
    res.status(200).send({ msg: "succeful", data: increasingTempOrder });
  }
  catch (err) {
    res.status(500).send({ msg: "Something went wrong" })
  }
}



const coinfetch = require("../models/coinModel");

const getCoin = async function (req, res) {
  let auth = req.header.authorization;
  try {
    let options = {
      method: "get",
      url: `http://api.coincap.io/v2/assets?Authorization=${auth}`
    };
    let response =  await axios(options)
    response = response.data.data;
    let Sortedcoin = response.sort(function (a, b) { return parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr); });
    let element;
    for (let i = 0; i < Sortedcoin.length; i++) {
      element = {
        symbol: Sortedcoin[i].symbol,
        name: Sortedcoin[i].name,
        marketCapUsd: Sortedcoin[i].marketCapUsd,
        priceUsd: Sortedcoin[i].priceUsd
      }
      await coinfetch.create(element);

    }
    let data=await coinfetch.find();
    res.status(200).send({ msg: "Successfully fetched data", "data":data });
  }
  catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }
}
module.exports.getCoin = getCoin;
module.exports.getWeather = getWeather;