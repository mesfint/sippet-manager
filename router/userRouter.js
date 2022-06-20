import express from "express";
import { register, getAll, login, loginForm, registerForm } from '../controller/userController.js'
import user from "../model/user.js";

const userRouter = express.Router();

userRouter.get('/users', getAll)
//register form 
userRouter.get('/register', registerForm)
userRouter.post('/register', register)


//login form 

userRouter.get('/login', loginForm)
userRouter.post('/login', login)
//userRouter.post('/login', loginForm)

export default userRouter