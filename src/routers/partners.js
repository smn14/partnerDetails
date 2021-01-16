const express = require('express')
const path = require('path')
const router = new express.Router() 

const fileUtils = require('../utils/fileUtils.js')
const mathUtils = require('../utils/mathUtils.js')
const arrayUtils = require('../utils/arrayUtils.js')

const returnElementWithinDistance = (element, relativeLatitude, relativeLongitude) =>{
  const coordinates = element["offices"][0]["coordinates"]
  const coordinatesArr = coordinates.split(',')
  const distance = mathUtils.calculateDistance(coordinatesArr[0], coordinatesArr[1], relativeLatitude, relativeLongitude)
  return {"distance" : distance, "element" : element}
}

router.get('/', (req, res)=>{
  res.render('findPartners.ejs')
})

router.get('/partners', async(req, res) => {
    
    const filename = path.join(__dirname, '../../res/partners.json')

    const partners = fileUtils.readFileAsSync(filename); 
    try{
        const relativeLongitude = escape(req.query.relativeLongitude)
        const relativeLatitude = escape(req.query.relativeLatitude)
        
        const range = escape(req.query.range)
        const key = 'organization'
        
        var partnersArray = []

        partners.forEach(element => {
          const partner = returnElementWithinDistance(element, relativeLatitude, relativeLongitude)
          
          if(   mathUtils.compareDecimal(Math.abs(partner["distance"]), range) == -1 
             || mathUtils.compareDecimal(Math.abs(partner["distance"]), range) == 0 ) {
            partnersArray.push(partner)
          }
        })
        partnersArray = arrayUtils.sortArrayDesc(partnersArray, key)
        
        res.status(200).send({partnersArray : partnersArray})
    }catch(e){
      console.log(e)
      res.status(404).send({'error': 'Error retrieving partners'})
    }
    
})

module.exports = {router, returnElementWithinDistance}