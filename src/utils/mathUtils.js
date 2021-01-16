
const constants = require('./constants.js')

const convertRadians = (value) => {
    return value * (Math.PI/180)
}
const calculateDistance = (latitude, longitude, relativeLatitude, relativeLongitude) => {
    const latitudeRadians = convertRadians(latitude)
    const longitudeRadians = convertRadians(longitude)
    const relativeLatitudeRad = convertRadians(relativeLatitude)
    const relativeLongitudeRad = convertRadians(relativeLongitude)
    const deltaLongitude = Math.abs(relativeLongitudeRad - longitudeRadians)
    const distance = constants.earthRadius * ( Math.atan( Math.sqrt(  Math.pow((Math.cos(relativeLatitudeRad) * Math.sin(deltaLongitude)
                                                                               ), 2)
                                                                    + Math.pow((  Math.cos(latitudeRadians) * Math.sin(relativeLatitudeRad)
                                                                                - Math.sin(latitudeRadians) * Math.cos(relativeLatitudeRad) * Math.cos(deltaLongitude)
                                                                                ), 2)
                                                                    )
                                                        /(  (Math.sin(latitudeRadians) * Math.sin(relativeLatitudeRad))
                                                            + (Math.cos(latitudeRadians) * Math.cos(relativeLatitudeRad) * Math.cos(deltaLongitude)
                                                               )
                                                          )
                                                        )
                                              )
    return distance
}

const compareDecimal = (a, b) => {
  if(a<b){
    return -1
  }else if(a==b){
    return 0
  }else if(a>b){
    return 1
  }
}
module.exports = {
                  calculateDistance
                , compareDecimal
                  }