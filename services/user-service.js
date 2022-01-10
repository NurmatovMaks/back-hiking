const { User } = require("../models");
const {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
  NOT_FOUND,
} = require("../utils/consts");
const ErrorHandler = require("./../utils/error-handler");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const { sendActivationMail } = require("./mail-service");
const { generateTokens } = require("../utils/tokens");

const signup = async (email, password, loginUser, role = "ADMIN") => {
  const oldUser = await User.findOne({ where: { email } });
  console.log(oldUser);
  if (oldUser) {
    throw ErrorHandler.BadRequest(USER_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(password, 3);
  const activationLink = uuid();
  const user = await User.create({
    email,
    password: hashedPassword,
    loginUser,
    role,
    activationLink,
  });
  await sendActivationMail(
    email,
    `${process.env.API}/user/activate/${activationLink}`
  );
  const tokens = generateTokens({ id: user.id, email, role, loginUser });
  return tokens;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw ErrorHandler.BadRequest(USER_NOT_FOUND);
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw ErrorHandler.BadRequest(WRONG_CREDENTIALS);
  }
  const tokens = generateTokens({
    id: user.id,
    email,
    role: user.role,
    loginUser: user.loginUser,
  });

  return tokens;
};
const refresh = async (token) => {
  if (!token) {
    throw ErrorHandler.UnauthorizedError();
  }
  const userData = validateRefreshToken(token);
  if (!userData) {
    throw ErrorHandler.UnauthorizedError();
  }
  const user = await User.findOne({ where: { id: userData.id } });
  if (!user) {
    throw ErrorHandler.BadRequest("user" + NOT_FOUND);
  }
  const tokens = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return tokens;
};

const activate = async (link) => {
  const user = await User.findOne({ where: { activationLink: link } });
  if (!user) {
    throw ErrorHandler.BadRequest("Activation link is incorrect");
  }

  user.isActivated = true;
  await user.save();
};

const statuses = {
  active: async () => {
    return await User.findAll({ where: { isActivated: true } });
  },
  inactive: async () => {
    return await User.findAll({ where: { isActivated: false } });
  },
  default: async () => {
    return await User.findAll();
  },
};

const getAll = async (status) => {
  return statuses[status] ? statuses[status]() : statuses["default"]();
};

module.exports = {
  signup,
  login,
  refresh,
  activate,
  getAll,
};
