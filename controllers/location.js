const { response, request, query } = require("express");
const { Location, Division } = require("../models");

const locationsGet = async (req = request, res = response) => {
  const { division, user, limit = 5, since = 0 } = req.query;
  const [count, locations] = await Promise.all([
    Location.count(),
    Location.find()
      .skip(Number(since))
      .limit(Number(limit))
      .populate("division", 'name')
      .populate("user", "name"),
  ]);
  res.status(200).json({ count, locations });
};
const locationGet = async (req = request, res = response) => {
  const { id } = req.params;

  const location = await Location.findById(id)
    .populate("user", "name")
    .populate("division", 'name');

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

  const location = new Location({
    title,
    description,
    division,
    number,
    schedule,
    urlImage,
    urlLocation,
    user: user._id,
  });

  await location.save();

  res.status(201).json({
    location,
  });
};

const locationPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, user, division, ...resto } = req.body;

  const existDivision = await Division.findById(division);
  if (existDivision) {
    resto.division;
  }

  resto.user = req.user._id;
  const location = await Location.findByIdAndUpdate(id, resto, { new: true })
    .populate("user", "name")
    .populate("division", "name");

  res.status(202).json({ location });
};

const locationDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const location = await Location.findByIdAndDelete(id);

  res.status(202).json(location);
};

module.exports = {
  locationsGet,
  locationGet,
  locationPost,
  locationPut,
  locationDelete,
};
