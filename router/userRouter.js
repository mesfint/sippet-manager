import express from "express";

import { login, loginForm, registerForm } from '../controller/userController.js'

const userRouter = express.Router();

//register 
userRouter.get('/register', registerForm)


//login 

userRouter.get('/login', loginForm)

export default userRouter