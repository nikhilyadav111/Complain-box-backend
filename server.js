const express = require("express");
require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db_config");
const { errorHandler } = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
//DB CONN//
connectDB();

//body parser//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Home Route//

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to Ticket API",
  });
});

//user Routes//

app.use("/api/user", require("./routes/userRoutes"));

//Ticket Routes//

app.use("/api/ticket", require("./routes/ticketRoutes"));

//Admin Routes//

app.use("/api/admin", require("./routes/adminRoutes"));

//Error handler//

app.use(errorHandler);

//Server//

app.listen(PORT, () => {
  console.log(`Server is running at PORT :${PORT}`.bgBlue);
});
