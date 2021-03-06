/**
 *  1. install npm in the directory => npm init
 * 2. install node express => npm install express --save
 * 3. import express n file => var express = require('express')
                                var app = express()
                                
    4. set server listen PORT number => app.listen(3000)
    5. create getResponse  = app.get("/", (req, res) => {
                                res.send("send response");
                            });
    6.install nodemon => npm install -g nodemon
    7. creating another api => /fruits/banana
    8. Dynamic url api = > set api url with " : " as '/users/:id'. here " :id " is dynamically taken from url
                            and to get this id from url we use req.params.id

    9.load data from HTML file .. => for this create another folder where client side side will host
==================================================================================================
    10. now creating Post request :) . we use PostMan to test post api
    11. create a post api
    12. to read  post req from body  we need to install  body-parser middleware => npm install body-parser

    ==    ===    ===    ====    ====    ====    ====    === 
    13. now to send data from html page .not from postman :)


    14.Install mongoDB => npm install mongodb --save
    14 Create account in mongo Atlas
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const app = express(); //creating express Application

const pass = "Dark@0011";
const dbUser = "dbUser";

const users = ["rahim", "karim", "jodu", "modhu"];

app.use(cors()); // cors problem solved
app.use(bodyParser.json()); // body parser middleware to post request from html file

const uri =
  "mongodb+srv://dbUser:Dark@0011@cluster0-37ztz.mongodb.net/test?retryWrites=true&w=majority";
let client = new MongoClient(uri, { useNewUrlParser: true });

// database connection

// coonecting mongo DB

// get api
// Calling root api
app.get("/products", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products"); //databse name onlineStore , table or collection name product
    // perform actions on the collection object
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        console.log("successfully inserted");

        res.send(documents); //reding data from post req from body
      }
    });
    console.log("database connected...");

    client.close();
  });
});

app.get("/fruits/banana", (req, res) => {
  //another api
  const fruitDetails = {
    fruit: "banana",
    quantity: 100,
    price: 1000
  };
  res.send(fruitDetails);
});

app.get("/product/:key", (req, res) => {
  console.log(req.query.sort); //check request query => that means  what is after ?in url. EX  ?sort=asc &

  //dynamic url api
  const key = req.params.key; //getting userid from url
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products"); //databse name onlineStore , table or collection name product
    // perform actions on the collection object
    collection.find({ key }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        console.log("successfully inserted");

        res.send(documents[0]); //reding data from post req from body
      }
    });
    console.log("database connected...");

    client.close();
  });
});

// ===================================

app.post("/getProductsByKey", (req, res) => {
  // console.log(req.query.sort); //check request query => that means  what is after ?in url. EX  ?sort=asc &

  //dynamic url api
  const key = req.params.key; //getting userid from url
  const productKeys = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products"); //databse name onlineStore , table or collection name product
    // perform actions on the collection object
    collection.find({ key: { $in: productKeys } }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        console.log("successfully inserted");

        res.send(documents); //reding data from post req from body
      }
    });
    console.log("database connected...");

    client.close();
  });
});

/**
 * Post request
 */

app.post("/addProduct", (req, res) => {
  const product = req.body;
  // console.log(product);
  // database Connection
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("products"); //databse name onlineStore , table or collection name product
    // perform actions on the collection object
    collection.insert(product, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successfully inserted");

        res.send(result.ops[0]); //reding data from post req from body
      }
    });
    console.log("database connected...");

    client.close();
  });
});

//==========================

app.post("/placeOrder", (req, res) => {
  const orderDetails = req.body;
  orderDetails.orderTime = new Date();
  // console.log(product);
  // database Connection
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("onlineStore").collection("orders"); //databse name onlineStore , table or collection name product
    // perform actions on the collection object
    collection.insertOne(orderDetails, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successfully inserted");

        res.send(result.ops[0]); //reding data from post req from body
      }
    });
    console.log("database connected...");

    client.close();
  });
});

app.listen(4200); //listing port number
