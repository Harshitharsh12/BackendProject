import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config();
const PORT = process.env.PORT;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running at port ${PORT} Successfully!!`);
    });
  })
  .catch((err) => console.log(`Database Connection failed!!`, err));
