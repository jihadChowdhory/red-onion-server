const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("RED ONION FOODS - Jihad Chowdhory (Developer)");
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
  const menuCollection = db.collection("menu");
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

  // =====x==== Getting Menu from Database ========= //

  app.get("/menu", (req, res) => {
    menuCollection.find({}).toArray((err, docs) => {
      if (docs) {
        res.send(docs);
      } else {
        res.send(err);
      }
    });
  });

  // =====x==== Getting Menu from Database =====x==== //
  // ========= Adding food item to Database ========= //

  app.post("/addfood", (req, res) => {
    const file = req.files.file;
    const name = req.body.name;
    const details = req.body.details;
    const price = req.body.price;
    const newImg = file.data;
    const encodedImg = newImg.toString("base64");
    const img = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encodedImg, "base64"),
    };
    menuCollection.insertOne({ name, details, price, img }).then((result) => {
      if (result.insertedId) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });

  // =====x==== Adding food item to Database =====x==== //
});

// ======x======= Connecting to MongoDB Database =====x===== //
app.listen(process.env.PORT || port);
