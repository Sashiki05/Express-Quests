require("dotenv").config();

const express = require("express");

const app = express();

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const {hashPassword,verifyPassword,verifyToken} = require ("./auth.js");
const port = process.env.APP_PORT ?? 8000;
const isItDwight = (req, res) => {
  if (req.body.email === "dwight@theoffice.com" &&
  req.body.password === "123456"){
    res.send("Credentials are valid");
  } else {res.sendStatus(401);
  }
};
const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

// ----------------------------Connection to server--------------------------
app.use(express.json());
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.get("/", welcome);

//Public routes
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.post("/api/users", hashPassword, usersHandlers.postUser);

app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

//Private routes
app.use(verifyToken);

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.put("/api/users/:id", hashPassword, usersHandlers.updateUser);
app.delete("/api/users/:id", usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});