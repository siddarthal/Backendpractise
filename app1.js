
// app.get("/demo", (req, res) => {
//   res
//     .status(200)
//     .render("demo", {
//       title: "Hey Harry",
//       message: "Hello there and thanks for telling me how to use pubG!",
//     }); // Our pug demo endpoint
// });

// app.get("/", (req, res) => {
//   res.send("this is home page of my first express app");
// });
// app.get("/about", (req, res) => {
//   res.status(200).send("this is about page of my first express app");
// });
// app.post("/about", (req, res) => {
//   res.send("this is a post request about page of my first express app");
// });
// const port = 80;
const express = require("express");
const path = require("path");
const fs =require("fs")
const app = express();
const port = 80;
// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); //For serving static files
app.use(express.urlencoded);
// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug

app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const con = "this is best";
  const params = { "title": "Pubg is the best game", "content": con };
  res.status(200).render("index.pug");
});

// app.post('/',(req,res)=>{
  
//   names=req.body.name;
//   age=req.body.age;
//   gender=req.body.gender;
//   address=req.body.address;
//   more=req.body.more;
//   let oput =`let the name of the client is${names},${age} years old ,${gender},residing at address ${address}
//   more about him:${more}` 
//     fs.writeFileSync("output.txt",oput);

//   const params = {"meassage": "Your form has been submitted successfully submitted" };
//   res.status(200).render("index.pug",params)
//  })

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully at port ${port}`);
});
