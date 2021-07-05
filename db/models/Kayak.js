const SequelizeSlugify = require('sequelize-slugify');
module.exports = (sequelize, DataTypes) => {
  const Kayak = sequelize.define('Kayak', {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      validate: { min: 100 },
      defaultValue: 150,
    },
    description: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
  });

  SequelizeSlugify.slugifyModel(Kayak, { source: ['name'] });

  return Kayak;
};
