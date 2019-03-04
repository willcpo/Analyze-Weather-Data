// require request
const request = require('request');
// require analytic.js
const analytic = require("./Analytic.js");

function recursiveRequest(next){
    request(`http://jvers.com/csci-ua.0480-spring2019-008/homework/02/${next}.json`, function(error,response,body){
        
        if(error){
            console.log(error);
            return;
        }

        const object = JSON.parse(body);
        console.log(analytic.generateReport(object.response,object.variable,object.unit));

        if(object.next){
            console.log();
            recursiveRequest(object.next);
        }

    });
}

recursiveRequest("temperature-resource");