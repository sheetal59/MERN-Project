require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
//const controllers = require("./controllers/auth-controllers")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");


//handliing cors
const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials:true,
}

app.use(cors(corsOptions));

app.use(express.json()); 
//it is a middleware that parses incoming request bodies
//with json payloads.
//It is important to handle JSON data in the request
//body. This middleware is resonsible for parsing JSON data from requests,
//and it should be applied at the beginning of you 
//middleware stack to ensure it's available for all subsequent route handlers


app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
//lets define admin route
app.use("/api/admin", adminRoute);



app.use(errorMiddleware);
//app.get("/",(req,res) => {
  //  res.status(200).send('Welcome to the page');
//});
//app.get("/register",(req,res) => {
  //  res.status(200).send('Welcome to the registeration page');
//});

const PORT = 5000;
connectDb().then(() => {
app.listen(PORT, () =>{
    console.log(`Server running at port: ${PORT}`);
});
});