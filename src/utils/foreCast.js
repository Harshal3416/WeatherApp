const request = require('request')

const foreCastCode = (long, lat, callback) => {

    // console.log(location)
const foreCastUrl =`https://api.darksky.net/forecast/3a8e506f2346d06bcaf519966650c121/${long},${lat}`
  
    request({url: foreCastUrl, json: true}, (err, {body})=>{
    
        
        console.log("data", body.daily)

        if(err){
            callback('UNABLE TO CONNECT', undefined)
        }
        else if(body.err)
        {
            callback('UNABLE TO FIND LOCATION', undefined)
        }
        else{
            callback(undefined, body.daily.data[0])
            // console.log("RESULT", res.body)
        }
        
        })
}

module.exports = foreCastCode