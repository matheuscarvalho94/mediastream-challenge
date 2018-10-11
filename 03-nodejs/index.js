'use strict';

console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');
var jsonexport = require('jsonexport');

// Setup Express.js app
const app = express();

//const router = express.Router();
app.get("/", (req, res) => {

    User
    .find({})
    .then(data => {

        jsonexport(data,function(err, csv){
            const csv = csv;
        });
          
        res.attachment('dados.csv')
        res.setHeader('Content-Type', 'application/text-csv')
        //output
        res.end(csv)

    })

});

app.listen(3000, function(){
    console.log("port 3000");
});