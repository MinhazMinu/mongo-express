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
 */

const express = require("express");
const cors = require("cors");
const app = express(); //creating express Application

const users = ["rahim", "karim", "jodu", "modhu"];

app.use(cors()); // cors problem solved

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

app.listen(3000); //listing port number
