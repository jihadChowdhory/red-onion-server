const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello");
});

// ============= Connecting to MongoDB Database ========== //

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://jihadchowdhory:s0mVRbU7ErUx0lJK@cluster0.8fqqs.mongodb.net/redOnion?retryWrites=true&w=majority";
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
      const result = docs.length > 0;
      res.send(result);
    });
  });

  // ========= Checking Identity ========= //
});

// ============= Connecting to MongoDB Database ========== //
app.listen(5000, () => {
  console.log("Listening to port 5000");
});
