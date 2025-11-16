import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PartsNPrice14June2025",
    })
    .then((c) => console.log(`Datebase connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
