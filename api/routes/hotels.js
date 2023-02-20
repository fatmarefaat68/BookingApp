const express = require("express");
const router = express.Router();
const {
  countByType,
  countByCity,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} = require("./../controllers/hotelController");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

//create and get all hotels
router.route("/").post(verifyAdmin, createHotel).get(getHotels);

router
  .route("/:id")
  .put(verifyAdmin, updateHotel)
  .delete(verifyAdmin, deleteHotel);

router.get("/find/:id", getHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

module.exports = router;

/*

"name":"Hotel fatma",
  "type":"hotel",
  "city":"cairo",
  "address":"somewhere",
  "distance":"700",
  "title":"best hotel in the city",
  "desc":"hotel description",
  "cheapestPrice":100


*/
