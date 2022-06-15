import User from "../model/user.js";


// login register 
export function registerForm(req, res){
  res.render('pages/register')
}
// login form 
export function loginForm(req, res){
    res.render('pages/login')
}

export function login(req, res) {
    const userInfo = req.body; //get the parsed information
  
    if (!userInfo.email || !userInfo.password ) {
      res.render("includes/show_message", {
        message: "Please fill in all fields",
        type: "error",
      });
    } else {
      const newUser = new User({
        email: userInfo.email,
        password: userInfo.password,
      });
      newUser.save((err, response) => {
        if (err) {
          res.render("includes/show_message", {
            message: "Error saving user to db",
            type: "error",
          });
        } else {
          res.redirect("/");
          /* res.render("includes/show_message", {
            message: "New user added",
            type: "success",
            user: response,
          }); */
        }
      });
    }
  }