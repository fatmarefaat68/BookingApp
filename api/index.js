const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Port = process.env.PORT || 3000;

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "database connected...",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    throw error;
  }
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/hotels", require("./routes/hotels"));
app.use("/api/rooms", require("./routes/rooms"));

app.use((err, req, res, next) => {
  const errorStatus = res.statusCode || 500;
  const errorMessage = err.message || "there is someting happens";

  res.json({
    sucess: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(Port, () => {
  connectDb();
  console.log(`listening to port...${Port}`);
});
