const express = require('express')
const exphbs = require('express-handlebars');
const session = require('express-session');
const db=require('./config/connection')
const app = express();

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")


app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
}))
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
next();
});

db.connect((err)=>{
  if(err) console.log("Connection error"+err); 
  else console.log("Database connection successfull")
   
})

const userRouter = require("./routes/user-routes")
const adminRouter = require("./routes/admin-routes")

app.use('/admin',adminRouter);
app.use('/',userRouter);
  


app.listen(7000,console.log('http://localhost:7000') ,() => {
  console.log("Server running on loacal host 7000");
 
})  
 

