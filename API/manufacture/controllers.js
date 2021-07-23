const { Kayak, Manufacture } = require('../../db/models');

exports.manufactureFetch = async (manufactureId, next) => {
  try {
    const manufacture = await Manufacture.findByPk(manufactureId);
    return manufacture;
  } catch (error) {
    next(error);
  }
};

exports.fetchManufacture = async (req, res, next) => {
  try {
    const manufactures = await Manufacture.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Kayak,
        as: 'kayaks',
        attributes: ['id'],
      },
    });
    res.json(manufactures);
  } catch (error) {
    next(error);
  }
};

// =====================// create manufacure //=========================== //
exports.createManufacure = async (req, res, next) => {
  try {
    const foundManufacture = await Manufacture.findOne({
      where: { userId: req.user.id },
    });
    if (foundManufacture) {
      const err = new Error('You already have a manufacture');
      err.status = 400;
      return next(err);
    }
    if (req.file) req.body.img = `http://${req.get('host')}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newManufacture = await Manufacture.create(req.body);
    res.status(201).json(newManufacture);
  } catch (error) {
    next(error);
  }
};

// =====================// create kayak //=========================== //
exports.createKayak = async (req, res, next) => {
  try {
    if (req.user.id === req.manufacture.userId) {
      if (req.file) req.body.img = `http://${req.get('host')}/${req.file.path}`;
      req.body.manufactureId = req.manufacture.id;
      const newKayak = await Kayak.create(req.body);
      res.status(201).json(newKayak);
    } else {
      const err = new Error('Unauthorized!');
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
