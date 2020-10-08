const functions = require('firebase-functions');
const admin = require('firebase-admin')
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
exports.RemoveUserFromChat = functions.https.onCall((data,context) => {
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
          })
          return ''
      }).catch(error => {
          throw error
      })
})

