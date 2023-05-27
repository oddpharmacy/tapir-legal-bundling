// requires
const express = require("express");
const cors = require("cors");
const path = require("path");

// port & origins
const PORT = 8080;
const allowedOrigins = [
  "http://localhost:3000",
  "https://tapir-legal.onrender.com",
];

// app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// start listening
app.listen(PORT, () => {
  console.log(`Yay! Server is listening on Port: ${PORT}`);
});

// controllers
const usersController = require("./controller/usersController");
const casesController = require("./controller/casesController");

// users routes
app.post("/login", usersController.getUser);
app.post("/signup", usersController.createUser);

// cases routes
app.post("/createcase", casesController.createCase);
app.get("/cases/:userId", casesController.getCasesByUser);
