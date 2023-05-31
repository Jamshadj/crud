const express = require('express')
const router = express.Router();
const session = require('express-session');
const signupHelper = require('../helpers/signup-helper');



router.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});


router.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
}))

router.get('/', (req, res) => {
  if (req.session.user) {
    res.render("home")
  } else {
    res.redirect('/login')
  }

})


router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect("/") 
  } else {
 
    if (req.session.loginerror) {

      res.render("login", { error: true })
    } else {
      res.render("login", { title: 'login' })
    }
  } 
})


router.post('/login', (req, res) => {
  signupHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user = {
        id:response.user._id
      }
      res.redirect('/')

    } else {
      req.session.loginerror = true
      res.redirect("/login")


    }
  })


})

router.get("/user-logout", (req, res) => {
  req.session.destroy();

  res.redirect("/login")
})

//signup
router.get('/signup', (req, res) => {
  if(req.session.user){
      res.redirect('/')
  }
  res.render("signup")

})

router.post('/signup', (req, res) => {
  if(req.session.user){
    res.redirect('/')
  }
  else
  signupHelper.doSignup(req.body).then((response) => {
    res.redirect('/login')
  }) 
  
})



module.exports = router;