module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING
}, {
  tableName: 'users',
  timestamps: false,
});
