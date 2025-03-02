const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name age').lean().exec();

    return res.render('app', { domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retreiving Domos!' });
  }
};

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both age / name are required!' });
  } if (Number.isNaN(req.body.age)) {
    return res.status(400).json({ error: 'Age must be a number!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    newDomo.save();
    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);
    // 11000 = Mongo’s “duplicate entry” error)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occurred!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
};
