// import mongoose from "mongoose";

// export const connectDB =async () => {
//     await mongoose.connect('mongodb+srv://utsav9472_db_user:Utsav2004@cluster0.mwrp3c1.mongodb.net/CarRental')
//      .then(() => console.log('DB Connected'))
// }

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" ✅ DB Connected");
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};
