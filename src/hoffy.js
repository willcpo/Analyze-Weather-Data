// add higher order functions here
module.exports = {

    parseMoves: function(s){

        const stringArray = [...s];
        const piece1 = stringArray.shift();
        const piece2 = stringArray.shift();

        //an Array of objects representing the moves encoded in the String, s

        //create object for each move
        return stringArray.map((col,i)=>{
            const val = i%2? piece2:piece1;
            return {val,col};
        });

    },

    shortestString: function(...s){

        if (s.length ===0) {return undefined;}

        return s.reduce((lastValue, currectValue)=>{

            if (lastValue.length < currectValue.length){
                return lastValue;
            }else{
                return currectValue;
            }

        });
        

    },

    repeatCall: function(fn, n, arg){

        if (n===0) {return;}

        fn(arg);

        this.repeatCall(fn,n-1,arg);

    },

    repeatCallAllArgs: function(fn, n, ...args){
 
        if (n===0) {return;}

        fn(...args);

        this.repeatCallAllArgs(fn,n-1, ...args);

    },

    steppedForEach: function(arr, fn, step){

        if(!arr.length) {return;}

        fn(arr.shift(),arr.shift(),arr.shift());

        this.steppedForEach(arr, fn, step);

    },

    constrainDecorator: function(fn, min, max){
        
        return function(...args){

            const returnVal = fn(...args);

            if (returnVal>max){
                return (max);
            } else if (returnVal<min){
                return (min);
            }else{
                return (returnVal);
            }
        };

    },

    limitCallsDecorator: function(fn, n){
        let count = n;
        return function (...args){
            if (count-- <=0) {return undefined;}
            return fn(...args);
        };


    },

    bundleArgs: function(fn, ...args){

        return function (...spread){
            return fn(...args,...spread);
        };

    },

    sequence: function(...functions){

        return function(...args){
            const firstFunc = functions[0];
            const initialValue = firstFunc(...args);
            
            return functions.reduce((prev, next,i)=>{
                if (i===0) {return prev;}
                return next(prev);
            },initialValue);
        };
        

    }

};