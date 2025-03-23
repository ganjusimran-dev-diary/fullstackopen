const User = require("../models/users");

const usersInDb = async (filter = {}) => {
  const users = await User.find(filter);
  return users.map((u) => u.toJSON());
};

module.exports = {
  usersInDb,
};
