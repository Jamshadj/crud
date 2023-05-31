const db=require('../config/connection')
const dbcollection=require('../config/collections');
const bcrypt =require('bcrypt');
// const collections = require('../config/collections');

module.exports={
  doSignup:(userData)=>{
    return new Promise(async(resolve,reject)=>{
      userData.password=await bcrypt.hash(userData.password,10)
        db.get().collection(dbcollection.SIGNUP_COLLECTION).insertOne(userData).then((data)=>{
          resolve(userData)
        }) 
    })
  
  } ,

doLogin:(userData)=>{
  return new Promise(async(resolve,reject)=>{
    let response = {}

    let user =await db.get().collection(dbcollection.SIGNUP_COLLECTION).findOne({email : userData.email})
    if(user){
      //check here if error
      bcrypt.compare(userData.password,user.password).then((status)=>{
        if(status){
          response.user=user
          response.status=true
          resolve(response)

        }else{
          resolve({status:false})

        } 
      })
    }else{
      resolve({status:false})
    }
  })
}
} 