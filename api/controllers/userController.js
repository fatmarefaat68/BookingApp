const User = require("./../models/Users");

const updateUser = async (req, res, next) => {
  console.log("updating user req");

  try {
    console.log("updating user req in try");
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  console.log("deleting User req");

  try {
    console.log("deleting User req in try");

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deletedUser");
  } catch (err) {
    console.log("error deleting User");
    next(err);
  }
};

const getUser = async (req, res, next) => {
  console.log("get User req");

  try {
    console.log("get User req in try");

    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log("get User err");
    next(err);
  }
};
const getUsers = async (req, res, next) => {
  console.log("get all User req");

  try {
    console.log("get all User req in try");

    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
