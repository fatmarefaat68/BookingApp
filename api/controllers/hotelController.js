const Hotel = require("./../models/Hotels");

const createHotel = async (req, res, next) => {
  console.log("posting hotel req");
  const newHotel = new Hotel(req.body);

  try {
    console.log("posting hotel req in try");

    await newHotel.save();
    res.status(200).send(newHotel);
  } catch (err) {
    next(err);
  }
};
/*const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );*/
const updateHotel = async (req, res, next) => {
  console.log("updating hotel req");

  try {
    console.log("updating hotel req in try");
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedHotel);
  } catch (err) {
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  console.log("deleting hotel req");

  try {
    console.log("deleting hotel req in try");

    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).send("deletedHotel");
  } catch (err) {
    console.log("error deleting hotel");
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  console.log("get hotel req");

  try {
    console.log("get hotel req in try");

    const hotel = await Hotel.findById(req.params.id);
    res.status(200).send(hotel);
  } catch (err) {
    console.log("get hotel err");
    next(err);
  }
};
const getHotels = async (req, res, next) => {
  console.log("get all hotel req");
  const { min, max, ...others } = req.query;

  try {
    console.log("get all hotel req in try");

    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 9999 },
    }).limit(req.query.limit);
    res.status(200).send(hotels);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  console.log("countByCities");
  const cities = req.query.cities.split(",");

  try {
    console.log("countByCities");
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).send(list);
    console.log(list);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  console.log("countByType");
  try {
    console.log("countByType in try");
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    console.log("countByType in try2");

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);

    console.log("countByType in try3");

    console.log([
      hotelCount,
      apartmentCount,
      resortCount,
      villaCount,
      cabinCount,
      resortCount,
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  countByType,
  countByCity,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
};
