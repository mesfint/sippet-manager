import bodyParser from "body-parser"; //For parsing JSON and url-encoded data)
import multer from "multer"; //For handling file uploads
import express from "express";
import 'dotenv/config'
import passport from 'passport'
import cookieParser from "cookie-parser";
import session from "express-session";

import connectEnsureLogin from 'connect-ensure-login'
import methodOverride  from 'method-override'
import mongoose from "mongoose";

import snippetRouter from "./router/snippetRouter.js";
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
/* import auth from "./router/auth.js"
import User from './model/user.js'
 */
//require('dotenv').config()
//require('./config/passport')(passport)

//import passport from  './config/passport.js'

const app = express();
const upload = multer();

app.set("view engine", "pug");
app.set("views", "./views");

//serve static file
app.use(express.static("public"));

// for parsing multipart/form-data
app.use(upload.array());

// for parsing application/json
app.use(bodyParser.json());


//form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//to overrid PUT Method by POST
app.use(methodOverride('_method'))

//cookies and sessions
app.use(cookieParser());
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));// 1 hour 

//set up Passport 
/* app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser()) */

/// routers 

//User router  should come first 
app.use("/user", userRouter); 
//app.use("/auth", authRouter); 
//app.use("/auth", auth); 
//snippet router
app.use("/", snippetRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});


