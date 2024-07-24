//A contoller refers to a part of your code that is responsible for handling the applications'logic.
//Controllers are typically used to process incoming requests, interact
//with models and send responses bac to clients.
//they help organizse your application by separating concerns and 
//following the MVC, model view controller design pattern

//const userModel = require("../models/user-model");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
//home logic
const home = async(req,res) => {
    try{
        
        res.status(200).send('Welcome to the page');
    }catch(error){
        console.log(error);
    }
};

//User registeration Logic
//1. Get the registeration data--retirieve user data
//2. Check email existence
//3. Hash Password
//4. Create user
//4.save to DB
//6. respond--registeration successfull
const register = async (req, res) => {
    try {
      // const data = req.body;
      console.log(req.body);
      const { username, email, phone, password } = req.body;
  
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(400).json({ message: "email already exists" });
      }
      //hash password
     // const saltRound =10;
     // const hash_password = await bcrypt.hash(password, saltRound);
  
      const userCreated = await User.create({ 
        username, 
        email, 
        phone, 
        password 
    });
  
      // res.status(201).json({ message: "User registered successfully" });
      res.status(201).json({ 
        msg: "Registeration Successful", 
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
       });
    } catch (error) {
     // res.status(500).json({ message: "Internal server error" });
     next(error);
    }
  };
  
//user login logic
const login = async(req,res)=>{
    try{
        const{ email, password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password,userExist.password);



        if(isPasswordValid){
            res.status(200).json({ 
                msg: "Login Successful", 
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
               });
        }else{
            res.status(401).json({message:"Invalid email or password"});
        }

    }catch(error){
        //res.status(500).json("Internal server error");
        next(error);
    }
};

//user logic to send user data

const user = async(req,res) => {
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    }catch(error){
        console.log(`error from the user route ${error}`);
    };
};



  module.exports = { home, register, login, user };