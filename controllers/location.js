const { response, request } = require("express");
const Location = require('../models/location')



const locationGet = async (req = request, res = response) => {
    const {division, title} = req.query;
    const locations = await Location.find({division })  

    res.status(200).json({locations})
    // .render('location')
  };

const locationPost = async (req = request, res = response) => {
    const {title, description, division, number, schedule, urlImage, urlLocation} = req.body;

    const location = new Location({title, description, division, number, schedule, urlImage, urlLocation})
    console.log(location)
    await location.save()

    res.status(201).redirect("/location")
  };




  module.exports = {
      locationPost,
      locationGet
  }

