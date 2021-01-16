var expect    = require('chai').expect
var partners = require('../src/routers/partners')
var request = require('request')

describe('Return element with Distance', () => {
    describe('Calculate distance to the relative point', () =>{
      it("finds the distance between a location and a relative location", () => {
        var partner = {
            "id": 1,
            "urlName": "balance-at-work",
            "organization": "Balance at Work",
            "customerLocations": "across Australia, Pacific and Oceania",
            "willWorkRemotely": true,
            "website": "http://www.balanceatwork.com.au/",
            "services": "At Balance at Work, we want to help you make work a joy for your employees and you! We specialize in leadership development, talent management and career coaching, and use Spidergap as one of our tools to help employees focus their development and achieve more.",
            "offices": [
              {
                "location": "Sydney, Australia",
                "address": "Suite 1308, 109 Pitt St \nSydney 2000",
                "coordinates": "-33.8934219,151.20404600000006"
              }
            ]
        }
        var partnerWithDistance = partners.returnElementWithinDistance(partner, '51.5144636', '-0.142571')

        var distance = partnerWithDistance["distance"]
        console.log('distance ' + distance);
        expect(distance).to.be.closeTo(-3018.895897, 0.9)

    })
    describe('api', ()=>{
      describe('api that returns a list of contact within a given range of a certain location', ()=>{
        it('returns status 404', (done)=>{
         
          request('http://localhost:3000/partner', (error, response, body) => {
            expect(response.statusCode).to.equal(404)
            done()
          })
        })

        it('returns status 200 with empty result', (done)=>{
          request('http://localhost:3000/partners', (error, response, body) => {
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.equal('{"partnersArray":[]}')
            done()
          })
        })

        it('returns status 200 with list of partners', (done)=>{
          request('http://localhost:3000/partners?relativeLatitude=51.5144636&relativeLongitude=-0.142571&range=6820.162587417329&key=organization', (error, response, body) => {
            expect(response.statusCode).to.equal(200)
            done()
          })
        })
      })

    })

  })
    
})