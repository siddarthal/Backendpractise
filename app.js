const express = require("express");
const  path = require("path");
 

const app = express();
// serving static files
app.use('/static',express.static('static'));
 // set the template  engine as pug
app.set('view engine','pug')
// set the views directory
app.set('views',path.join(__dirname,'views'))
app.get("/", (req, res) => {
  res.send("this is home page of my first express app");
});
app.get("/about", (req, res) => {
  res.status(200).send("this is about page of my first express app");
});
app.post("/about", (req, res) => {
  res.send("this is a post request about page of my first express app");
});
const port = 80;
app.listen(port, () => {
  console.log(`The application started successfully at port ${port}`);
});
