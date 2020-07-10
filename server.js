// Setup empty JS object to act as endpoint for all routes
let projectData ={};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
// Make a request for a user with a given ID


// Start up an instance of app

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


app.get('/all', (req, res) => {
    res.json(projectData);
});
app.post("/add", (req, res) => {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    res.json(projectData)
})

// Setup Server

app.listen(3000 || process.env.PORT, process.env.IP, () => {
    console.log("The server is running on port 3000");
})