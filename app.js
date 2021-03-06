// importing packages
const express = require('express');
const cors = require('cors');
const passport = require('passport');

// new instance of express
const app = express();

// import routes
const kayaksRoutes = require('./API/kayak/routes');
const manufactureRoutes = require('./API/manufacture/routes');
const userRoutes = require('./API/user/routes');
const orderRoutes = require('./API/order/routes');

// importing db
const db = require('./db/models');
//
const { localStrategy } = require('./middleware/passport');
const { jwtStrategy } = require('./middleware/passport');

// using cors to allow acces data
app.use(cors());

// parsing body as json
app.use(express.json());

// routes
app.use('/kayaks', kayaksRoutes);
app.use('/manufactures', manufactureRoutes);
app.use(userRoutes);
app.use(orderRoutes);

// middlewares
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// media routes
app.use('/media', express.static('media'));
// error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error!' });
});
// not found => respond with a message for a not declared path!
app.use((req, res, next) => {
  res.status(404).json({ message: 'Path Not Found!' });
});
// ===================== end middleware ========================== //

// running the server and connecting to db
const run = async () => {
  try {
    // we add {force: true} one time to allow add new colum in DB
    await db.sequelize.sync({ alter: true });
    console.log('Database is connected');
    app.listen(8000, () => console.log('App is running on port 8000'));
  } catch (error) {
    console.error(error);
  }
};
run();
