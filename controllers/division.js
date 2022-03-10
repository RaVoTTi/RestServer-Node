const { response, request, query } = require("express");
const { Division } = require("../models");

const divisionsGet = async (req = request, res = response) => {
  const { limit = 50, since = 0 } = req.query;
  // const query = {division: 'alojamiento'}

  // const locations = await Division.find()
  // const count = await division.count()

  const [count, divisions] = await Promise.all([
    Division.count(),
    Division.find().skip(Number(since)).limit(Number(limit))
  ]);
  res.status(200).json({ count, divisions });
};
const divisionGet = async (req = request, res = response) => {
  const { id } = req.params;

  const division = await Division.findById(id);

  res.status(200).json({ division });
};

const divisionPost = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const division = new Division({
    name,
  });

  await division.save();

  res.status(201).json({
    division,
  });
};

const divisionPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, name } = req.body;

  const division = await Division.findByIdAndUpdate(id, {name:name.toUpperCase()}, { new: true });

  res.status(202).json({ division });
};

const divisionDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const division = await Division.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(202).json({division});
};

module.exports = {
  divisionsGet,
  divisionGet,
  divisionPost,
  divisionPut,
  divisionDelete,
};
