const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello");
});

// ============= Connecting to MongoDB Database ========== //

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8fqqs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const db = client.db("redOnion");
  const adminCollection = db.collection("admin");
  console.log("Database Connected");
  // ========= Checking Identity ========= //

  app.post("/checkIdentity", (req, res) => {
    const email = req.body.email;
    adminCollection.find({ email: email }).toArray((err, docs) => {
      if (docs) {
        result = docs.length > 0;
        res.send(result);
      } else {
        res.send(err);
      }
    });
  });

  // =====x==== Checking Identity =====x==== //
});

// ======x======= Connecting to MongoDB Database =====x===== //
app.listen(process.env.PORT || port);
