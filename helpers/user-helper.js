const db = require('../config/connection')
const dbcollection = require('../config/collections');
const { USER_COLLECTION } = require('../config/collections');
const { ObjectId } = require('bson');



module.exports = {

  addUser: (user, callback) => {
    console.log(user)
    db.get().collection(dbcollection.USER_COLLECTION).insertOne(user).then((data) => {
      // console.log(data)
      callback(data)
    })
  },
  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      let user = await db.get().collection(dbcollection.USER_COLLECTION).find().toArray()
      resolve(user)

    })
  },

  //to remove a user
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.get().collection(dbcollection.USER_COLLECTION).deleteOne({ _id: ObjectId(userId) }).then((response) => {
        console.log(response);
        resolve(response)


      })

    })
  },

  getUserData: (userId) => {
    return new Promise((resolve, reject) => {
      db.get().collection(dbcollection.USER_COLLECTION).findOne({ _id: ObjectId(userId) }).then((response) => {
        resolve(response)
      })
    })
  },

  updateUserData: (userId, data) => {
    return new Promise((resolve, reject) => {
      db.get().collection(dbcollection.USER_COLLECTION).updateOne({ _id: ObjectId(userId) }, { $set: { name: data.name, email: data.email } }).then((response) => {
        resolve(response)
      })
    })
  },



  searchUserData: (userData) => {
    return new Promise(async (resolve, reject) => {
      let search=await db.get().collection(dbcollection.USER_COLLECTION).find( {$or:[{name:new RegExp (userData.name,'i')},{email:new RegExp (userData.name)}]} ).toArray()
      resolve(search)


    })
  }




}
