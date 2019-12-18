const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const config = require("config");

const app = express();
app.use(express.json());

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//READ Request Handlers
app.get("/", (req, res) => {
  res.send("IDS");
});

app.get("/getTable", (req, res) => {
  MongoClient.connect(db, function(err, client) {
    if (err) throw err;
    const db = client.db("ids");

    db.collection("idsData")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
      });
  });
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
