const database = require("./database");


const getUsers = (req, res) => {
  let sqlReq = "select * from users";
  let sqlQuery = [];

  if (req.query.language && req.query.city) {
    sqlReq += " where language = ? and city = ?";
    sqlQuery.push(req.query.language, req.query.city);
  } else if (req.query.language) {
    sqlReq += " where language = ?";
    sqlQuery.push(req.query.language);
  } else if (req.query.city) {
    sqlReq += " where city = ?";
    sqlQuery.push(req.query.city);
  }

  database
    .query(sqlReq, sqlQuery)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
// Crée une route GET pour le chemin /api/users/:id

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query(`select * from users where id = ${id}`)
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// Crée une route POST pour le chemin /api/users

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    });
};

// Crée une route PUT pour le chemin /api/users/:id

const updateUser = ( req,res ) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;
  
  database
    .query("update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
    [firstname, lastname, email, city, language, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      }else {
        res.sendStatus(204);
      } 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
  };

// Crée une route DELETE pour le chemin /api/users/:id 

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) { 
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting user");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
};