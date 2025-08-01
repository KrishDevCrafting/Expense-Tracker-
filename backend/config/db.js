const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("MogoDb connected");
  } catch (err) {
    console.log("Error connecting to MongoDb", err);
    process.exit(1);
  }
};

module.export = connectDB;
