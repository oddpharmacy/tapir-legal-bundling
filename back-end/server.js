// requires
const express = require("express");
const cors = require("cors");

// port & origins
const PORT = 8080;
const allowedOrigins = ["http://localhost:3000"];

// app
const app = express();
app.use(express.static("build"));
app.use(express.json());
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

// start listening
app.listen(PORT, () => {
  console.log(`Yay! Server is listening on Port: ${PORT}`);
});
