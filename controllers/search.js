const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Division, Location } = require("../models");

const permittedCollections = ["users", "divisions", "locations", "roles"];

const search = (req = request, res = response) => {
  const { collection } = req.params;

  if (!permittedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${permittedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUser(req, res);
      break;
    case "locations":
      searchLocation(req, res);
      break;
    case "divisions":
      searchDivision(req, res);

      break;
    default:
      break;
  }
};
const searchUser = async (req = request, res = response) => {
  const { word } = req.params;
  const { limit = 5, since = 0 } = req.query;
  const isMongoId = ObjectId.isValid(word);

  if (isMongoId) {
    const user = await User.findById(word);
    return res.json(respJson(user));
  }

  const regex = RegExp(word, "i");
  const [count, user] = await Promise.all([
    User.count({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ state: true }],
    })
      .skip(Number(since))
      .limit(Number(limit)),
    User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ state: true }],
    })
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.json({
    count,
    result: user,
  });
};
const searchLocation = async (req = request, res = response) => {
  const { word } = req.params;
  const { limit = 5, since = 0 } = req.query;
  const isMongoId = ObjectId.isValid(word);

  if (isMongoId) {
    const location = await Location.findById(word).populate("division", "name");
    return res.json(respJson(location));
  }

  const regex = RegExp(word, "i");
  const [count, location] = await Promise.all([
    Location.count({
      title: regex,
    })
      .skip(Number(since))
      .limit(Number(limit)),

    Location.find({ title: regex })
      .skip(Number(since))
      .limit(Number(limit))
      .populate("division", "name"),
  ]);

  res.json({
    count,
    result: location,
  });
};

const searchDivision = async (req = request, res = response) => {
  const { word } = req.params;
  const { limit = 5, since = 0 } = req.query;
  const isMongoId = ObjectId.isValid(word);

  if (isMongoId) {
    const division = await Division.findById(word);
    return res.json(respJson(division));
  }

  const regex = RegExp(word, "i");
  const [count, division] = await Promise.all([
    Division.count({ $and: [{ name: regex }, { state: true }] })
      .skip(Number(since))
      .limit(Number(limit)),

    Division.find({ $and: [{ name: regex }, { state: true }] })
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.json({
    count,
    result: division,
  });
};

const respJson = (word = "") => {
  return word ? { count: 1, result: word } : { count: 0, result: [] };
};
module.exports = {
  search,
};
