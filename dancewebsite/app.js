const express = require("express");
const path = require("path");
const bodyparser =require("body-parser")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}

const app = express();
const port = 8000;
// define mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc :String
  });
  
  const contact = mongoose.model('Contact', contactSchema);

// app.use(express.static('static', options));

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
app.get('/', (req, res)=>{
   
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
   
    
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
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
 