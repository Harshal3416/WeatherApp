const request = require('request')

const foreCastCode = (long, lat, callback) => {

    // console.log(location)
const foreCastUrl =`https://api.darksky.net/forecast/8b356ed5f3fd0f9690aa9a3f3eb91e44/${long},${lat}`
  
    request({url: foreCastUrl, json: true}, (err, {body})=>{
    
        if(err){
            callback('UNABLE TO CONNECT', undefined)
        }
        else if(body.err)
        {
            callback('UNABLE TO FIND LOCATION', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary)
            // console.log("RESULT", res.body)
        }
        
        })
}

module.exports = foreCastCode