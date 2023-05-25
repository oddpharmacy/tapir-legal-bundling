// requires
const express = require("express");
const cors = require("cors");
const path = require("path");

// port & origins
const PORT = 8080;
const allowedOrigins = ["http://localhost:3000"];

// app
const app = express();
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  cors({
    origin: (origin, cb) => {
      if (allowedOrigins.includes(origin) || !origin) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

// start listening
app.listen(PORT, () => {
  console.log(`Yay! Server is listening on Port: ${PORT}`);
});
