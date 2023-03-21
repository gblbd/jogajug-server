const axios = require('axios');
const express = require('express');

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
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
        );

        const weather = response.data.weather[0].description;
        const temperature = response.data.main.temp;
        const humidityData = response.data.main.humidity;

        console.log(response);
        // just ajker weather report dhekasse.Temp in kelvin, not Farenheight
        return res.json({ weather, temperature, humidityData });
    } catch (err) {
        return res.json(err);
    }
};
