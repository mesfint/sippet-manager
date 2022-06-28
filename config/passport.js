import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
//import { OAuth2Client } from 'google-auth-library'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GoogleTokenStrategy = require('passport-google-id-token')
import userService from '../services/user'
import User from '../models/User'

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

//JWT Strategy for authorization

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      //can access the token from various location : header , urlqueryparameter or authrization as bearer
      jwtFromRequest: ExtractJWT.fromExtractors([
        ExtractJWT.fromUrlQueryParameter('token'),
        ExtractJWT.fromHeader('token'),
        ExtractJWT.fromAuthHeaderAsBearerToken(),
      ]),
    },
    async function (token, done) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      try {
        await User.findById(token.user.id, function (err, user) {
          if (err) {
            return done(err, false)
          }
          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })

        /* return done(null, token.user) */
      } catch (err) {
        done(err)
      }
    }
  )
)
passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, done) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      try {
        const isemailAvailable = await userService.emailFound(email)

        if (!isemailAvailable) {
          const userCreate = new User({
            email: email.toLocaleLowerCase(), //sanitize
            password: password,
          })
          const user = await userService.create(userCreate)
          return done(null, user, { message: 'Signed up  Successfully' })
        }
      } catch (err) {
        return done(err, false, { message: 'Incorrect email or password' })
      }
    }
  )
)

// POST login
router.post(
  '/login',
  async (req, res, next) => {
    
    passport.authenticate('login', async (err, user) => {
      try {
        if (err || !user) {
          //const error = new Error('email/password is not correct.')
          return next(err)
        }
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
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  }
)


export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
    //getGoogleCerts: optionalCustomGetGoogleCerts,
  },
  async function (parsedToken, clientId, done) {
    const userPayload = {
      userName: parsedToken?.payload?.given_name,
      email: parsedToken?.payload?.email,
      firstName: parsedToken?.payload?.given_name,
      lastName: parsedToken?.payload?.family_name,
      avatar: parsedToken?.payload?.picture,
    }
    try {
      const user = await userService.findOrCreate(userPayload)
      done(null, user)
    } catch (e) {
      done(e)
    }
  }
)
passport.use('google-id-token', googleStrategy)

/* const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  const payload = ticket.getPayload()

  console.log(`User ${payload?.name} verified`)

  //const { sub, email, name, picture } = payload; 
  //const { sub, email, name, picture } = payload
  //const userId = sub
  //return {userId, email, fullName: name, photoUrl: picture}
  return payload
}
export default googleAuth */
//export const jwtStrategy = new JwtStrategy({}, function () {})

