const express = require("express");
const router = express.Router();
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  getRoom,
} = require("./../controllers/roomController");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");
router.route("/").get(getRooms);
router.route("/:hotelId").post(verifyAdmin, createRoom);
router.route("/:id").put(verifyAdmin, updateRoom).get(getRoom);

router.route("/:id/:hotelId").delete(verifyAdmin, deleteRoom);

module.exports = router;
