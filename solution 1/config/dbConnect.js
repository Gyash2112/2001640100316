const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((e) => console.log(e));
};
module.exports = dbConnect;
