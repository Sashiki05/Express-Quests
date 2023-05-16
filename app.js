require("dotenv").config();
const express = require("express");
const app = express();
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const port = process.env.APP_PORT ?? 8000;
app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

// ----------------------------Connection to server--------------------------
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
// ----------------------------Routes Welcome--------------------------
app.get("/", welcome);

// ----------------------------Routes Movies--------------------------
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

// ----------------------------Routes Users--------------------------

app.get("/api/users", userHandlers.getUsers);
app.post("/api/users", userHandlers.postUser);
app.put("/api/users/:id", movieHandlers.updateMovie);
app.delete("/api/users/:id", movieHandlers.deleteMovie);