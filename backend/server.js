const express = require("express");
const authRoutes = require("./routes/authRoute.js");
// const userRoutes = require("./routes/userRoute.js");

const app = express();
app.use(express.json());

require("dotenv").config();

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
