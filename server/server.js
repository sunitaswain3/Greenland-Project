const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const landRoutes = require("./routes/landRoutes")
const sellerRoutes = require("./routes/sellerRoutes")

const app = express();
// dotenv.config();
connectDB();

app.use(cors());    // // open to all domains

app.use(express.json({ limit:"50mb"}));

                             


app.use("/api/land", landRoutes);
app.use("/api/sellerAuth",sellerRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
