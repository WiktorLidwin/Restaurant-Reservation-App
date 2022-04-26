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

server.listen(port, () => {
    console.log('Server listening at port %d', port);
  });
  
  // Routing
  app.use(express.json())
  app.use(express.static(path.join(__dirname, 'public')));
  
  TOKEN_KEY  = "ASDasdasdasdasd"

  const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      console.log(req.body)
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
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


app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        console.log(req)
        console.log(req.body)
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
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
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
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
    constructor(name, menu, layout, stafflist, description, location){
        this.name = name
        this.menu = menu
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

