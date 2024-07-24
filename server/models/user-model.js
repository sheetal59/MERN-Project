const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
//secure the password with bcrypt
userSchema.pre("save", async function(next){
    //console.log("pre method", this);
    const user = this;

    if(!user.isModified("password")){
        next();
    }

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }catch(error){
        next(error);
    }
});

//what is JWT
//Json web tokens(JWT) is an open standard that defines a compact and self contained way
//for securely transmitting information between parties as a JSON object
//JWT are often used for authentication and authorization in web applications.
//1.Authentication:- Verifying the identity of a user or lcient.
//2. AUthorization:- Determining what actions a user or client is allowed to perform

//components of JWT
//1.Header: Conatins metadata about the token, such as the type of token and the signing algorithm
//2. Payload: Contains claims or statements about an entity(user) and additional dara.
//common claims include user UD, username, and expiration date
//3. Signature: To verify that the sender of the JWT is who it says it is and to ensure
//that the message wasnt changed along the way, as ignature is required.

//Tokens are typically not stored in the database along with other user details. Instead, they are issued by the server
//during the authetication process and then stored on the client side(cookies or local storage) for later use

userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: "30d",
        }
    );
    }catch(error){
        console.error(error);
    }
};

// define the model or the collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;

