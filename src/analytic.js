// function generateReport
module.exports = {

    generateReport: function (weatherData, variable, unit){

        if (unit==="K"){
            weatherData = weatherData.map((obj)=>{
                const newObj = Object.keys(obj).reduce((accum,key)=>{
                   
                    if (typeof obj[key] === 'number' ){
                        accum[key] = obj[key]* 1.8 - 459.67;
                    }else{
                        accum[key] = obj[key];
                    }

                    return accum;
                },{});
                return newObj;
            });
            unit = "F";
        }

        const meanDivisor = weatherData.length;

        const meanDataPoints = weatherData.reduce((accum,curr,j)=>{

            return Object.keys(curr).reduce((obj,prop)=>{
               if (typeof curr[prop]==='number'){
                   if (j===0) {
                       
                       obj[prop] = curr[prop]/meanDivisor;

                   }else{
                       
                       obj[prop] = curr[prop]/meanDivisor+accum[prop];
                       
                   }
                   
               }
               return obj;
           },{});

       },{});

        const meanLowHigh = Object.keys(meanDataPoints).map((key)=>{

            return{city:key, temp:meanDataPoints[key]};

        }).sort((a,b)=>{
            return a.temp-b.temp;
        });

        let report= `Top 10 Cities with highest mean ${variable}\n`;

        report+= `${meanLowHigh[35].city}: ${meanLowHigh[35].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[34].city}: ${meanLowHigh[34].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[33].city}: ${meanLowHigh[33].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[32].city}: ${meanLowHigh[32].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[31].city}: ${meanLowHigh[31].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[30].city}: ${meanLowHigh[30].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[29].city}: ${meanLowHigh[29].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[28].city}: ${meanLowHigh[28].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[27].city}: ${meanLowHigh[27].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[26].city}: ${meanLowHigh[26].temp.toFixed(2)} (${unit})\n`;

        report+= `\nTop 10 Cities with lowest mean ${variable}\n`;
        
        //Loop? 10 times
        report+= `${meanLowHigh[0].city}: ${meanLowHigh[0].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[1].city}: ${meanLowHigh[1].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[2].city}: ${meanLowHigh[2].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[3].city}: ${meanLowHigh[3].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[4].city}: ${meanLowHigh[4].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[5].city}: ${meanLowHigh[5].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[6].city}: ${meanLowHigh[6].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[7].city}: ${meanLowHigh[7].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[8].city}: ${meanLowHigh[8].temp.toFixed(2)} (${unit})\n`+
            `${meanLowHigh[9].city}: ${meanLowHigh[9].temp.toFixed(2)} (${unit})\n`;

        let springAverageNY = weatherData.filter((obj)=>{
            //let date = new Date(obj["datetime"]);
            
            const string= [...obj["datetime"]];
            const date = new Date();
            date.setUTCFullYear(Number.parseInt(string[0]+string[1]+string[2]+string[3]));
            date.setUTCMonth(Number.parseInt(string[5]+string[6])-1);
            date.setUTCDate(Number.parseInt(string[8]+string[9]));
            date.setUTCHours(Number.parseInt(string[11]+string[12]));
            date.setUTCMinutes(Number.parseInt(string[14]+string[15]));
            date.setUTCSeconds(Number.parseInt(string[17]+string[18]));

            return (date.getFullYear()===2013 && date.getMonth()>0 && date.getMonth()<4);

        });
        
        springAverageNY= springAverageNY.reduce((accum,curr)=>{

            accum += curr["New York"]/springAverageNY.length;
            return accum;
        },0);

        report+= `\nThe average ${variable} over spring 2013 in New York is: ${springAverageNY.toFixed(2)} (${unit})`;

        return report;


    }

};