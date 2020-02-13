const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// index route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// route for writing/saving/deleting notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// GET notes API
app.get("/api/notes", (req, res) => {
    return res.json(db);
});

// GET note API by ID? 
app.get("/api/notes/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// POST ... write to db.json
app.post("/api/notes", (req, res) => {
    db.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(db), err => {
        if (err) throw err;
    });
    res.send();
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});



/*

app.delete(`/api/notes/:id`, function(req, res) {
  
  const chosen = req.params.id;
  const index = db.findIndex( note => note.id === chosen);
  db.splice(index, 1);
  fs.writeFile("develop/db/db.json", JSON.stringify(db), err => {
    if (err) throw err;
  });
  res.send();
});

 */