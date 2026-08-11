import mongoose from "mongoose";
mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@ac-dwrpxci-shard-00-00.o4cvr9a.mongodb.net:27017,ac-dwrpxci-shard-00-01.o4cvr9a.mongodb.net:27017,ac-dwrpxci-shard-00-02.o4cvr9a.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-jhv7w4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Kodetritechnologies`
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongodb server is connected");
});

db.on("error", (err) => {
  console.log(err);
});

db.on("disconnected", () => {
  console.log("mongodb server is disconnected");
});

export default db;
