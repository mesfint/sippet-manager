import express from 'express'
import jwt from 'jsonwebtoken'
import passport  from 'passport'
import passportLocal from 'passport-local'
import User from '../model/user.js'
import bcrypt from 'bcryptjs'
/* import { Request, Response, NextFunction } from 'express'
 */
const LocalStrategy = passportLocal.Strategy

const router = express.Router()

//passport login 
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        User.findOne({ email: email }).exec(function(error, user){

          if (error || !user ) {
            return done(null, false, { message: 'User not found' })
          }
          
          user.comparePassword(password, (err, isMatch)=>{
            if (err) {
              return done(null, false, { message: 'Wrong Password' })
            }
            if(isMatch){
            return done(null, user, { message: 'Logged in Successfully' })
            }
          })
          //const validate = await user.isValidPassword(password)
        })
      } catch (error) {
        return done(error)
      }
    }
  )
)




router.post(
  '/google',
  passport.authenticate('google-id-token', { session: false }),
  async (req, res, next) => {
    //GENERATE JWT TOKEN USING USER
    try {
      const user = req.user
      const token = jwt.sign({ user }, process.env.JWT_SECRET || '')
      res.json({
        message: 'Sign in/up successfull',
        user: user,
        token: token,
        status: req.user ? 200 : 401,
      })
    } catch (error) {
      next(error)
    }
  }
)
//return done(null, false, { message: 'User already exists please login' })
/* POST signup. */
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    try {
      res.json({
        message: 'Signup/Sign in  successful',
        user: req.user,
      })
    } catch (error) {
      next(error)
    }
  }
)

// POST login router 
router.post(
  '/login',
  async (req, res, next) => {
    if(!req.body.email || !req.body.password){
      console.log(req.body.email, 'email.com')
      return res.render('pages/login', {
        type:'error',
        message:'Please provide email and password'
      })
    }else{
      passport.authenticate('login', async (err, user) => {
        try {
          if (err || !user) {
            //const error = new Error('email/password is not correct.')
            /* return res.render('pages/login', {
              type:'error',
              message: 'some error ',
            }) */
            return next(err)
            
          }else{

          
            req.login(user, { session: false }, async (error) => {
              if (!error) {
                const body = {
                  id: user.id,
                  email: user.email /* , isAdmin: user.isAdmin */,
                }
                const token = jwt.sign(
                  { user: body },
                  process.env.JWT_SECRET || 'this is secrete',
                  {
                    expiresIn: '24h',
                  }
                )
                //return res.json({ token, id: user.id, email:user.email })
                return res.render(
                  'pages/index', 
                  {
                    snippets:[]/* req.session.snippets */, 
                    token:token,
                    user:{
                      id: user.id, 
                      email:user.email,
                    },
                    message: "You are successfully logged in! Welcome " + user.email,
                    type: "success",
                  })
              }
              return next(error)
            })
          }
        } catch (error) {
          return next(error)
        }
      })(req, res, next)
     }
  }
)
export default router
