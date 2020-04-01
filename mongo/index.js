/**
 *  1. install npm in the directory => npm init
 * 2. install node express => npm install express --save
 * 3. import express n file => var express = require('express')
                                var app = express()
                                
    4. set server listen PORT number => app.listen(3000)
    5. create getResponse  = app.get("/", (req, res) => {
                                res.send("send response");
                            });
 */

const express = require("express");
const app = express(); //creating express Application

app.get("/", (req, res) => {
  res.send("send response");
});

app.listen(3000); //listing port number
