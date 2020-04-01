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
    7. creting another api => /fruits/banana
 */

const express = require("express");
const app = express(); //creating express Application

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

app.listen(3000); //listing port number
