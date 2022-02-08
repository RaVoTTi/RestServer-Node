const { response, request, query } = require("express");
const Location = require('../models/location')



const locationGet = async (req = request, res = response) => {
    const {division, title, limit = 5, since = 0} = req.query;
    // const query = {division: 'alojamiento'} 
    
    // const locations = await Location.find().skip(Number(since)).limit(Number(limit))
    // const count = await Location.count() 

    const [count, locations] = await Promise.all([
      Location.count(),
      Location.find().skip(Number(since)).limit(Number(limit))
    ])
    res.status(200).json({count, locations})
  
  };

const locationPost = async (req = request, res = response) => {
    const {title, description, division, number, schedule, urlImage, urlLocation} = req.body;

    const location = new Location({title, description, division, number, schedule, urlImage, urlLocation})
    console.log(location)
    await location.save()

    res.status(201).json({
      location
    })
  };

  const locationPut = async (req = request, res = response) =>{
      const {id} = req.params
      const {_id, ...resto} = req.body

      const location = await Location.findByIdAndUpdate(id, resto, {new: true
      })

      res.status(202).json({location})
  }

  const locationDelete = async (req = request, res = response) =>{
    const {id} = req.params
    const location = await Location.findByIdAndDelete(id)

    res.status(202).json(location)
}




  module.exports = {
      locationPost,
      locationGet,
      locationPut,
      locationDelete,
      
    }

