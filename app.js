// importing packages
const express = require('express');
const cors = require('cors');
// new instance of express
const app = express();
// import routes
const kayaksRoutes = require('./API/routes');
// importing db
const db = require('./db/models');

// ===================== start middleware ========================== //
// using cors to allow acces data
app.use(cors());
// parsing body as json
app.use(express.json());
// ===================== end middleware ========================== //

// =====================Start Routes========================== //
app.use('/kayaks', kayaksRoutes);
// =====================End Routes========================== //

// running the server and connecting to db
const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database is connected');
    app.listen(8000, () => console.log('App is running on port 8000'));
  } catch (error) {
    console.error(error);
  }
};
run();
