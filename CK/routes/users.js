const express= require('express');
const bcrypt = require('bcryptjs');
const router=express.Router();

//User Mode
const User = require('../models/user');
//const { collection } = require('../models/user');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Chinmay123:Chinmay123@cluster0.t1hev.mongodb.net/Clusterdb";
const client = new MongoClient(uri, {  useUnifiedTopology: true , useNewUrlParser: true });
client.connect(uri, funtion(err, db)= {
  if(err) =>throw err;
  else {
  const collection = client.db("Clusterdb").collection("users");
  var dbo = db.db("Clusterdb");
  }
});

  // perform actions on the collection object
  //callback(collection);
  //client.close();




router.get('/login', function(req, res){
 res.render('login');
 console.log('login page requested');
});

router.get('/register', function(req, res){
    res.render('register');
    console.log('register page requested');
});

router.post('/register', (req,res) => {
     const { name, email, password, password2 } = req.body;
     let error = [];
     //Check field!
      if(!name || !email || !password || !password2)
        error.push({ msg: 'Please fill all the fields'});

      // Check Password match
      if(password !== password2)
         error.push({msg: 'password do not mmatch!'});
         
      //pass length
       if(password.length < 6)
        error.push({ msg: 'password should be atleast 6 length'});   
    
     if(error.length > 0){
       res.render('register',{
           error, name, email, password, password2
       }) ;    
     }

     else{
     const collection = client.db("Clusterdb").collection("users");

dbo.collection("users").findOne({email : email}, function(err, res){
  if(res){
    error.push('username already exist');
    console.log('Username exist');
    res.render('register', {
      error,
      name,
      email,
      password,
      password2
    });
  }
  else{
    const newUser = new User({
      name,
      email,
      password
    });

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err;
            //Encrypt Password
            newUser.password = hash;
            
            console.log(newUser);
            newUser.save()
              .then( user =>{
                res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        });
      });
      }
    });
  }
});

    /*  collection.find({email: email}, {$exists: true}).toArray(function(err, doc) //find if a value exists
      {
        if (doc) {
          error.push({ msg: 'Email already exists' });
          console.log(collection);
          res.render('register', {
            error,
            name,
            email,
            password,
            password2
          });
        } */
       /*
        else {
          const newUser = new User({
            name,
            email,
            password
          });
      
              // Hash password
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                  if(err) throw err;
                  //Encrypt Password
                  newUser.password = hash;
                  
                  console.log(newUser);
                  newUser.save()
                    .then( user =>{
                      res.redirect('/users/login');
                  })
                  .catch(err => console.log(err));
              });
            });
            }
          });*/

module.exports = router;
