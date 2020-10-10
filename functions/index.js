const functions = require('firebase-functions');
const admin = require('firebase-admin');
var assert = require('assert')
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.printRoom = functions.https.onCall((data,context) => {
//     return `${data.user_uid}`
// })

// exports.getAmountOfRooms = functions.https.onCall((data,context) => {
//     return admin.firestore().collection('rooms').onSnapshot(snap => {
//         return snap.docs.length()
//     })
// })

  /* deletes user from chat,
     deletes the chat if no other users
     data = {user_uid,chat_id} */
exports.removeUserFromChat = functions.https.onCall((data,context) => {
    /* delete the user with the user_uid from chat with chat_id*/
    return admin.firestore()
    .collection('rooms')
    .doc(data.chat_id)
    .collection("users_on_page")
    .where('user_uid', '==', data.user_uid)
    .get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        doc.ref.delete()
      })
      return ''
    })
      /* after delete, check if chat is empty and deletes if it does */
      .then(() => {
        admin.firestore()
          .collection('rooms')
          .doc(data.chat_id)
          .collection("users_on_page")
          .onSnapshot(snap => {
            if (snap.doc === undefined || snap.doc.length === 0 ) { //if chat has no users
                admin.firestore().collection('rooms').doc(data.chat_id).delete()
            }
            // TODO reduce room.count_users by 1
          })
          return ''
      }).catch(error => {
          throw error
      })
})
/* adds user to chat that has 1 user already,
    if no chat like this, creates new chat and adds the user.
    @ param data = {user_uid, user_name} */
exports.addUserToChat = functions.https.onCall((data,context) => {
    return admin.firestore().collection('rooms')
    .where('users_count','==',1)
    .get().then(snapshot => {
      //return room with 1 user, or undefined if not exist
     return snapshot.docs[0]
    })
    .then(room => {
      if(room) {
        room.ref.collection('users_on_page')
        .add({
          user_name: data.user_name,
          user_uid: data.user_uid
        })
        room.ref.set({
          users_count: 2
        })
        return {
            chat_id: room.id,
        }   
      }
      else {
        return admin.firestore().collection('rooms').add({})
        .then(new_room => {
             assert(new_room)
          new_room.collection('users_on_page').add({
            user_name: data.user_name,
            user_uid: data.user_uid
          })
          new_room.set({
            users_count: 1
          })
          return {
            chat_id: new_room.id,
          }
        }).catch(error => {
            throw error
        })
      }
    }).catch(error  => {
        throw error
    })
})


