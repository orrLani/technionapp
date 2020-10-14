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
     @param data = {chat_id} */
exports.removeUserFromChat = functions.https.onCall((data,context) => {
    functions.logger.log(context.auth.uid)
    data.chat_id = undefined
    return admin.firestore()
    .collection('users')
    //get chat that was written on user doc
    .doc(context.auth.uid)
    .get()
    .then(snap => {
        return snap.data().chat_id
    })
    .then(chat_id => {
        if (chat_id === undefined) {
            throw new Error("User is not in chat!");
        }
        data.chat_id = chat_id
        admin.firestore()
        .collection('users')
        .doc(context.auth.uid)
        .update({
            chat_id: admin.firestore.FieldValue.delete()
        })
        return admin.firestore().collection('rooms')
        .doc(chat_id)
        .collection("users_on_page")
        .where('user_uid', '==', context.auth.uid)
        .get()
    })
    .then((querySnapshot) => {
        /* deletes every user with same uid in the chat (need to be only 1) */
        querySnapshot.forEach(doc => {
            doc.ref.delete()
        })
        return ``
    })
      /* after delete, check if chat is empty and deletes if it does */
      .then(() => {

        //returs chat reference
        return admin.firestore().collection('rooms').doc(data.chat_id).get()
      })
      .then(chatRef => {
        // returns users_count
        return chatRef.data().users_count
      })
      .then(users_count => {
        // if user was the last on the chat, delete the chat.
        if(users_count === 1) {
          return admin.firestore().collection('rooms').doc(data.chat_id).delete()
        }
        // else, decrement users count
        else{
          const decrement = admin.firestore.FieldValue.increment(-1);
          return admin.firestore().collection('rooms').doc(data.chat_id).update({
              users_count: decrement
          })
        }
      })
      .catch(error => {
          throw error
      })
})
/* adds user to chat that has 1 user already,
    if no chat like this, creates new chat and adds the user.
    @ param data = {user_name} */
exports.addUserToChat = functions.https.onCall((data,context) => {
    functions.logger.log("I'm adding user to chat!")
    return admin.firestore().collection('rooms')
    .where('users_count','==',1)
    .get().then(snapshot => {
      //return room with 1 user, or undefined if not exist
     return snapshot.docs[0]
    })
    .then(room => {
        // if not room found, create one
        if(room === undefined){
            return admin.firestore().collection('rooms').add({})
        }
        else {
            return room.ref
        }
    })
    .then(roomRef => {
        roomRef.collection('users_on_page')
        .add({
            user_name: data.user_name,
            user_uid: context.auth.uid
        })
        //add chat_id to user
        admin.firestore().collection('users').doc(context.auth.uid).update({
            chat_id: roomRef.id
        })
        return roomRef
    }).then(roomRef => {
        //add 1 to users_count
        const increment = admin.firestore.FieldValue.increment(1)
        roomRef.update({
            users_count: increment
        })
        return {
            chat_id: roomRef.id,
        }
    })
    .catch(error => {
        throw error
    })
})
