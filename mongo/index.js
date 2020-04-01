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
const app = express(); //creating express Application

const pass = 'Dark@0011'
const dbUser = 'dbUser'

const users = ["rahim", "karim", "jodu", "modhu"];

// database connection

// coonecting mongo DB
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:Dark@0011@cluster0-37ztz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("onlineStore").collection("products");  //databse name onlineStore , table or collection name product
  // perform actions on the collection object
  collection.insertOne({
    name:"mobile",
    price:190,
    stock:16
  }, (err, res)=>{
    console.log('successfully inserted');
    
  })
  console.log("database connected...");
  
  client.close();
});



app.use(cors()); // cors problem solved
app.use(bodyParser.json()); // body parser middleware to post request from html file

// get api
app.get("/", (req, res) => {
  // Calling root api
  const fruit = {
    product: "ada",
    price: 220
  };
  res.send(fruit);
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

app.get("/users/:id", (req, res) => {
  console.log(req.query.sort); //check request query => that means  what is after ?in url. EX  ?sort=asc &

  //dynamic url api
  const id = req.params.id; //getting userid from url
  const name = users[id]; // getting use name from users Array
  res.send({ id, name });
});

/**
 * Post request
 */

app.post("/addUser", (req, res) => {
  //creating post request
  const user = req.body;
  user.id = 55;

  res.send(user); //reding data from post req from body
});

app.listen(3000); //listing port number
