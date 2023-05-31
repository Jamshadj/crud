const express = require('express')
const router = express.Router();
const userHelper = require('../helpers/user-helper');
const signupHelper = require('../helpers/signup-helper');




router.get('/', (req, res) => {
  // console.log(req.session)
  if (req.session.admin) {
    userHelper.getAllUsers().then((user) => {
      res.render('admin-home', { user })
    })
  } else
    res.redirect('admin/login')

})

router.get('/login', (req, res) => {
  if (req.session.admin) {
    res.redirect("/admin")
  } else {
    res.render("admin-login", { title: "adminlogin" })
  }
})



router.post("/login", (req, res) => {
  var passwordd = "123";
  var emailid = "jamshad@gmail.com"
  const { email, password } = req.body;
  if (email == emailid && password == passwordd) {
    req.session.admin = true;
    res.redirect('/admin')
  } else {
    res.render('admin-login', { error: true })
  }
})

router.get('/delete-user/:id', (req, res) => {
  let userId = req.params.id
  // console.log(userId);
  userHelper.deleteUser(userId).then((response) => {
    if(req.session.user.id===userId){
      req.session.user=null
    }
    res.redirect('/admin')
  })
})

router.get('/edit-user/:id', (req, res) => {

  userHelper.getUserData(req.params.id).then((user) => {

    res.render("edit-user", { user })

  })

})

router.post('/update-user/:id', (req, res) => {
  userHelper.updateUserData(req.params.id, req.body).then(() => {
    res.redirect("/admin")
  })

})

//creating new user

router.get('/create-user', (req, res) => {

  res.render('create-user');

})

router.post('/create-user', (req, res) => {
  signupHelper.doSignup(req.body).then((response) => {
    console.log(response)

    res.redirect('/admin')

  })
})

//search

router.post('/search', (req, res) => { 
  console.log(req.body);
  userHelper.searchUserData(req.body).then((user) => {
    console.log(user);
    res.render('admin-home', { user })
  })
})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login")
})


module.exports = router;