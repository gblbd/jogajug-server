const axios = require('axios');
const express = require('express');

const app = express();

exports.readWeatherDetails = async (req, res) => {
    console.log('hello');
    try {
        // today current times weather report
        const currentDate = new Date();
        const currentTime = currentDate.getTime() / 1000; // convert to UNIX timestamp
        console.log(currentTime);
        const API_KEY = 'ce7eca7e7a61b5b5c411d3d7927fa1b7';
        const CITY_NAME = 'Dhaka';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`,
        );

        const weather = response.data.weather[0].description;
        const temperature = response.data.main.temp;
        console.log(`Current weather in ${CITY_NAME}: ${weather}, Temperature: ${temperature}K`);
        const ConvertToF = 1.8(temperature - 273) + 32;
        console.log(response);
        // just ajker weather report dhekasse
        res.json({ weather, temperatureInF: ConvertToF });
    } catch (err) {
        return res.status(400).json(err);
    }
};
