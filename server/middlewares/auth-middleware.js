const jwt = require("jsonwebtoken");
const User = require("../models/user-model");


const authMiddleware = async(req, res, next) => {
    const token = req.header("Authorization");

    if(!token){
        //if you attempt to use an expired token, you"ll recive a "401" unauthorizaed https response.
        return res
        .status(401)
        .json({message: "Unauthorized HTTP, Token not provided"});
    }
   

    //assuming toen is in the format "Bearer <jwt Token">, removing the Bearer prefix
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token from auth middleware", jwtToken);

    try{
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({email: isVerified.email}).select({
            password: 0,
        });
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        console.log(isVerified);

        next();
    }catch(error){
        return res.status(401).json({message: "Unauthorized. Invalid token."});

    };
};

module.exports = authMiddleware;