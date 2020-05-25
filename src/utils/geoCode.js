const request = require('request')

const geocode = (address, callback) => {

    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoiaGFyc2hhbGIiLCJhIjoiY2s3Zm13Y3NkMDQ3bzNlbWZmdGVkcm1kMiJ9.lXo5osf-_IZmlZhK0OaubA&limit=1`

    request({url: geoUrl, json: true}, (err, {body})=>{
    
        if(err){
            callback('UNABLE TO CONNECT', undefined)
        }
        else if(body.features.length === 0)
        {
            callback('UNABLE TO FIND LOCATION', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
            // console.log("RESULT",res.body.features)
        }
        
        })
}

module.exports = geocode