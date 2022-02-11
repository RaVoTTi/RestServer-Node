const { response, request, query } = require("express");
const { Location, Division } = require("../models");

const locationsGet = async (req = request, res = response) => {
  const { division, user, limit = 5, since = 0 } = req.query;
  // const query = {division: 'alojamiento'}

  // const locations = await Location.find().skip(Number(since)).limit(Number(limit))
  // const count = await Location.count()

  const [count, locations] = await Promise.all([
    Location.count(),
    Location.find()
      .skip(Number(since))
      .limit(Number(limit))
      .populate("user", "name")
      .populate("division", "name"),
  ]);
  res.status(200).json({ count, locations });
};
const locationGet = async (req = request, res = response) => {
  const { id } = req.params;

  const location = await Location.findById(id)
    .populate("user", "name")
    .populate("division");

  res.status(200).json({ location });
};

const locationPost = async (req = request, res = response) => {
  const { user } = req;
  const {
    title,
    description,
    division,
    number,
    schedule,
    urlImage,
    urlLocation,
  } = req.body;

  const divisionObj = await Division.findOne({ name: division });

  const location = new Location({
    title,
    description,
    division: divisionObj._id,
    number,
    schedule,
    urlImage,
    urlLocation,
    user: user._id,
  });
  console.log(location);
  await location.save();

  res.status(201).json({
    location,
  });
};

const locationPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, user, division, ...resto } = req.body;
  resto.user =  req.user; 
  if(division){
    resto.division = await Division.findOne({name: division})._id;

  }
  
  const location = await Location.findByIdAndUpdate(id, resto, { new: true });

  res.status(202).json( {location} );
};

const locationDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const location = await Location.findByIdAndDelete(id);

  res.status(202).json(location.populate('user','name').populate('division'));
};

module.exports = {
  locationsGet,
  locationGet,
  locationPost,
  locationPut,
  locationDelete,
};
