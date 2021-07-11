// importing Model
const { User } = require('../../db/models');
// pack
const bcrypt = require('bcrypt');

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
