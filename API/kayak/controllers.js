// importing Model
const { Kayak } = require('../../db/models');

// !XXX!
exports.kayakFetch = async (kayakId, next) => {
  try {
    const kayak = await Kayak.findByPk(kayakId);
    return kayak;
  } catch (error) {
    next(error);
  }
};

// =====================// fetch all kayaks //=========================== //
exports.fetchKayak = async (req, res, next) => {
  try {
    const kayaks = await Kayak.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json(kayaks);
  } catch (error) {
    next(error);
  }
};
// =====================// delete single kayaks //=========================== //
exports.deleteKayak = async (req, res, next) => {
  try {
    await req.kayak.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
// =====================// update kayak //=========================== //
exports.updateKayak = async (req, res, next) => {
  try {
    if (req.file) req.body.img = `http://${req.get('host')}/${req.file.path}`;
    const updatedKayak = await req.kayak.update(req.body);
    res.json(updatedKayak);
  } catch (error) {
    next(error);
  }
};
