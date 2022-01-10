const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  loginUser: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

const Ticket = sequelize.define("tickets", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE },
  image: { type: DataTypes.STRING },
  info: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

const Comments = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.TEXT, allowNull: false },
});
User.hasMany(Ticket);
Ticket.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);

Ticket.hasMany(Comments);
Comments.belongsTo(Ticket);

module.exports = {
  User,
  Ticket,
  Comments,
};
