const express = require("express");
const path = require("path");
const app = express();
const port = 80;

const bodyparser = require("body-parser");
const { check,validationResult} = require('express-validator');

const mongoose = require("mongoose");


async function main() {
  await mongoose.connect("mongodb://localhost/contacts");
}

main().catch((err) => console.log(err));
app.use("/static", express.static("static"));
app.use(express.urlencoded());
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")
// mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    gender: String,
    address: String,
    more :String
  });
  const contact = mongoose.model('Contact', contactSchema);
app.get('/', (req, res)=>{
    
    res.status(200).render("sidha");
})
app.post('/'
, [
    check('name', 'Please enter your Name')
    .isLength({ min: 3, max: 10 }),
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 5, max: 300 }),
   
    check('age', 'Age cant be empty')
                    .isNumeric().isLength({ min: 1, max: 20 }),
    check('gender', 'Please specify Your Gender')
                    .isLength({ min: 3, max: 10 }),
    check('address', 'Address cant be empty')
                     .isLength({ min: 3, max: 100 }),
    check('more', 'Please tell about yourself in more than 15words')
                    .isLength({ min: 15, max: 100 })
]
,

(req, res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const alert = error.array();
      return res.status(400).json({errors:alert})
       
    }
    else
    {
        var myData = new contact(req.body);
        myData.save().then(()=>{
            res.send("this item has been sent to db")
        }).catch(()=>{
            res.status(400).send("item was not sent")
        });
    }
    
})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
