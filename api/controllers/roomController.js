const Room = require("./../models/Rooms");
const Hotel = require("./../models/Hotels");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    res.send(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    res.status(200).send("room deleted");
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

module.exports = { createRoom, updateRoom, deleteRoom, getRooms, getRoom };
