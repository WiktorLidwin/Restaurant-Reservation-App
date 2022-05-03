const fs = require('fs')
require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const port = 3000;
const User = require("./model/user");
const Reservation = require("./model/reservation");


server.listen(port, () => {
    console.log('Server listening at port %d', port);
  });
  
  // Routing
  app.use(express.json())
  app.use(express.static(path.join(__dirname, 'public')));
  
  TOKEN_KEY  = "ASDasdasdasdasd"

  const auth = require("./middleware/auth");
const reservation = require('./model/reservation');

app.post("/api/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.get("/profile", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.post("/api/reserve", auth, async (req, res) => {
  try{
    const { email, reservationDate, resturantID, table } = req.body;

  if (!(email)) {
    res.status(400).send("All input is required");
  }
  
  const user = await User.findOne({ email });
  
  

  res.status(200).send("Welcome 🙌 ");
  }catch (err) {
    console.log(err);
  }
  
});

app.post("/api/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      console.log(req)
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
      console.log(user)
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
            TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
        
        // user
        res.status(200).json(user);
      }else{
          res.status(400).send("Invalid Credentials");
      }
      
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });


app.post("/api/register", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        console.log(req)
        // console.log(req.body)
      const { first_name, last_name, email, password, type } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name && type)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        type
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
          TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      console.log("successfull user creation")
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  
  app.post("/api/reservations", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        console.log(req)
        // console.log(req.body)
      const { resturantID, numberOfPeople} = req.body;
      
      // Validate user input
      if (!(resturantID && numberOfPeople)) {
        res.status(400).send("All input is required");
      }
      
      let reservations = await Reservation.find({ resturantID });
      free = []
      for(let i = 0; i< reservations.length; i++){
        console.log(reservations[i].clientId ,reservations[i].numberOfPeople )
        if(reservations[i].clientId == "" && parseInt(numberOfPeople) <= parseInt(reservations[i].numberOfPeople)){
          free.push(reservations[i])
        }
      }
      free = JSON.stringify(free)
    
      res.status(201).json(free);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  app.post("/api/createReservation", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        console.log(req)
        // console.log(req.body)
      const { resturantID, table, reservationDate,numberOfPeople  } = req.body;
      
      // Validate user input
      if (!(resturantID && table && reservationDate && numberOfPeople)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      confirmationNumber = Math.floor(100000 + Math.random() * 900000)
      while(await Reservation.findOne({ confirmationNumber })){
        confirmationNumber = Math.floor(100000 + Math.random() * 900000)  
      }
      // Create user in our database
      const reservation = await Reservation.create({
        name: "",
        clientId: "",
        resturantID,
        table,
        reservationDate,
        numberOfPeople,
        confirmationNumber,
        details: ""
      });

      console.log("successfull reservation creation")
      // return new user
      res.status(201).json(reservation);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

io.on('connection', (socket) => {
    console.log('a user connected');


    socket.on('hello',(text)=>{
        console.log("hello from user ", text)
    });
});
  
class Restaurant{
    constructor(name, phoneNumber, layout, stafflist, description, location){
        this.name = name
        this.phoneNumber = phoneNumber
        this.layout = layout
        this.staff = stafflist
        this.description = description 
        this.location = location
    }

    changeName(name){
        this.name = name;
    }

    removeStaff(name){
        for(let i = 0; i < this.stafflist.length; i++){
            if (stafflist[i].name == name){
                this.stafflist.splice(i, 1);
            }
        }
    }
    addStaff(name, role){
        for(staff in this.stafflist){
            if (staff.name == name)
                return;
        }
        let e = new Staff(name, role)
        this.stafflist.push(e)
    }
    addEntry(name, price, description, picture, category){
        for(entry in this.entries){
            if (entry.name == name)
                return;
        }
        let e = new Entry(name, price, description, picture, category)
        this.entries.push(e)
    }
    removeEntry(name){
        for(let i = 0; i < this.entries.length; i++){
            if (this.entries[i].name == name)
                this.entries.splice(i, 1);
        }
    }

    // makeLayout(foors){

    // }
}

class Menu{
    constructor(entries, categories){
        this.entries = entries
        this.categories = categories
    }
    
}

class Entry{
    constructor(name, price, description, picture, category){
        this.name = name;
        this.price = price
        this.description = description
        this.picture = picture
        this.category = category
    }
}

class Layout{
    constructor(floors){
        this.floors = floors
    }
}

class Floor{
    constructor(tables, seats){
        this.tables = tables;
        this.seats = seats;
    }
}

class Table{
    constructor(center, type, height, width){// type is circle or rectangle, if circle height is radius
        this.center = center
        this.type = type
        this.height = height
        this.width = width
    } 
}

class Seat{
    constructor(center, type, height, width, numberOfPeople, description){// type is circle or rectangle, if circle height is radius and width is 0
        this.center = center
        this.type = type
        this.height = height
        this.width = width
        this.numberOfPeople = numberOfPeople
        this.description = description
    } 
}

class Staff{
    constructor(name, role){
        this.name = name
        this.role = role
    }
    
}

