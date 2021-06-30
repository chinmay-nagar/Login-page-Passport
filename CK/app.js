const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var app=express();


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Chinmay123:Chinmay123@cluster0.t1hev.mongodb.net/Clusterdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {  useUnifiedTopology: true , useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("Clusterdb").collection("users");
  // perform actions on the collection object
  //callback(collection);
   client.close();
}); 

//EJS

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false}));

//Routes
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(process.env.PORT || 8000, console.log('Listening'));