const SequelizeSlugify = require('sequelize-slugify');
module.exports = (sequelize, DataTypes) => {
  const Manufacture = sequelize.define('Manufacture', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    img: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Manufacture, { source: ['name'] });
  return Manufacture;
};
