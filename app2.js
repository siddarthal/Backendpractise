const express = require("express");
const path = require("path");
const app = express();
const port = 80;

const bodyparser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost/contacts");
}
app.use("/static", express.static("static"));
app.use(express.urlencoded());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more :String
  });
  const contact = mongoose.model('Contact', contactSchema);
app.get('/', (req, res)=>{
    
    res.status(200).render('index.pug');
})
app.post('/', (req, res)=>{
    
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been sent to db")
    }).catch(()=>{
        res.status(400).send("item was not sent")
    });
})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});