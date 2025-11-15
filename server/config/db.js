import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conne = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("👍  Database Connected");
  } catch (error) {
    console.error("❌ Error occured ", error.message);
  }
};

export default connectDB;
