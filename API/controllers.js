// importing Model
const { Kayak } = require('../db/models');

// =====================// fetch all kayaks //=========================== //
exports.fetchKayak = async (req, res) => {
  try {
    const kayaks = await Kayak.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json(kayaks);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

// =====================// create kayak //=========================== //
exports.createKayak = async (req, res) => {
  try {
    const newKayak = await Kayak.create(req.body);
    res.status(201).json(newKayak);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

// =====================// delete single kayaks //=========================== //
exports.deleteKayak = async (req, res) => {
  // getting the kayak id from the url
  const { kayakId } = req.params;
  try {
    // check if the kayak is exists
    const foundKayak = await Kayak.findByPk(kayakId);
    // if the kayak exists delete it
    if (foundKayak) {
      await foundKayak.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: `kayak is not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};
// =====================// update kayak //=========================== //
exports.updateKayak = async (req, res) => {
  // getting the kayak id from the url
  const { kayakId } = req.params;
  try {
    // checking if the the kayak is exists
    const foundKayak = await Kayak.findByPk(kayakId);
    if (foundKayak) {
      console.log(foundKayak);
      await foundKayak.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: `kayak is not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};
