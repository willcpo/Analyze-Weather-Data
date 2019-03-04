// function analyzeTemperature
//pass in array of objects 
module.exports = {
    analyzeTemperature: function (weatherData){

        const meanDivisor = weatherData.length;
        
        let report=`The first 10 lines of Temperature in NY:\n`;

        report += weatherData.reduce((accum,curr,i)=>{
            if (i<10) {accum+=`At ${curr["datetime"]}, the temperature in NY is ${curr["New York"].toFixed(2)} (F)\n`;}
            return accum;
        },"");
        
        const meanTemperatures = weatherData.reduce((accum,curr,j)=>{

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

        const highLowNY = weatherData.reduce((accum,curr)=>{

            if (curr["New York"]>=accum.high.temp){
                accum.high.time=curr["datetime"];
                accum.high.temp=curr["New York"];
            }

            if (curr["New York"]<=accum.low.temp){
                accum.low.time=curr["datetime"];
                accum.low.temp=curr["New York"];
            }
            return accum;

        },{high:{time:"",temp:-Infinity},low:{time:"",temp:Infinity}});

        report+= `The mean temperature in San Diego is: ${meanTemperatures["San Diego"].toFixed(2)} (F)\n\n`+
            `The coldest time in New York is: ${highLowNY.low.time}\n`+
            `The lowest temperature is: ${highLowNY.low.temp.toFixed(2)} (F)\n`+
            `The warmest time in New York is: ${highLowNY.high.time}\n`+
            `The highest temperature is: ${highLowNY.high.temp.toFixed(2)} (F)\n\n`;
        
        report+= `Top 10 Cities with highest mean temperature\n`;

        
        const meanLowHigh = Object.keys(meanTemperatures).map((key)=>{

            return{city:key, temp:meanTemperatures[key]};

        }).sort((a,b)=>{
            return a.temp-b.temp;
        });



        report+= `${meanLowHigh[35].city}: ${meanLowHigh[35].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[34].city}: ${meanLowHigh[34].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[33].city}: ${meanLowHigh[33].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[32].city}: ${meanLowHigh[32].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[31].city}: ${meanLowHigh[31].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[30].city}: ${meanLowHigh[30].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[29].city}: ${meanLowHigh[29].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[28].city}: ${meanLowHigh[28].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[27].city}: ${meanLowHigh[27].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[26].city}: ${meanLowHigh[26].temp.toFixed(2)} (F)\n`;

        report+= `\nTop 10 Cities with lowest mean temperature\n`;
        
        //Loop? 10 times
        report+= `${meanLowHigh[0].city}: ${meanLowHigh[0].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[1].city}: ${meanLowHigh[1].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[2].city}: ${meanLowHigh[2].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[3].city}: ${meanLowHigh[3].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[4].city}: ${meanLowHigh[4].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[5].city}: ${meanLowHigh[5].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[6].city}: ${meanLowHigh[6].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[7].city}: ${meanLowHigh[7].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[8].city}: ${meanLowHigh[8].temp.toFixed(2)} (F)\n`+
            `${meanLowHigh[9].city}: ${meanLowHigh[9].temp.toFixed(2)} (F)\n`;

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

        report+= `\nThe average temperature over spring 2013 in New York is: ${springAverageNY.toFixed(2)} (F)`;

        return report;

        

    }
};