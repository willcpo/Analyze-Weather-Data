// require fs 
const fs = require('fs');
// require tempAnalytic.js
const tempAnalytic = require("./tempAnalytic.js");

fs.readFile("./historical-hourly-weather-data-json/temperature.json",'utf8', (err, data) => {
    
    if (err) {
        console.log(err);
    }else{
        //each obj is {time ...city:tempeture}
       let dataObjects = JSON.parse(data);

       // Convert Kelvin Temps to Fahrenheit
        dataObjects = dataObjects.map((obj)=>{
            const newObj = Object.keys(obj).reduce((accum,key)=>{
                if (typeof obj[key] === 'number' ){
                    accum[key] = obj[key]* 1.8 - 459.67;
                }else{
                    accum[key] = obj[key];
                }
                return accum;
                
            },{});

            //print the first ten lines of temperature in New York
            //if (i<10) console.log(`At ${newObj["datetime"]}, the temperature in NY is ${newObj["New York"]} (F)`);
            
            return newObj;
        });
        
        const report = tempAnalytic.analyzeTemperature(dataObjects);
        console.log(report);

        return dataObjects;

    }
  });

