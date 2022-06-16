import express from "express";

import { register, login, loginForm, registerForm } from '../controller/userController.js'

const userRouter = express.Router();

//register form 
userRouter.get('/register', registerForm)
userRouter.post('/register', register)


//login form 

userRouter.get('/login', loginForm)
userRouter.post('/login', login)
//userRouter.post('/login', loginForm)

export default userRouter