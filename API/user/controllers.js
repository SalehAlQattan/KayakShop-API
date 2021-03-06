// importing Model
const { User } = require('../../db/models');
// pack
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRATION_MS, JWT_SECERT } = require('../../config/keys');

exports.singup = async (req, res, next) => {
  const { password } = req.body;
  const saltRound = 10;
  // hashing the pass
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: 'User Created Successfully!' });
  } catch (error) {
    next(error);
  }
};

exports.singin = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECERT);
  res.json({ token });
};
