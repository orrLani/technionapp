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
     deletes the chat if users_count <= 2. 
     @param data = {chat_id} */
exports.removeUserFromChat = functions.https.onCall((data,context) => {
    functions.logger.log(context.auth.uid)
    data.chat_id = undefined
    // let users_count = 0;
    return admin.firestore()
    .collection('users')
    //get chat that was written on user doc
    .doc(context.auth.uid)
    .get()
    .then(snap => {
        functions.logger.log(snap.data())
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
      /* after delete, check if chat is empty or only left with 1 user and deletes if it does */
      .then(() => {

        //returs chat reference
        return admin.firestore().collection('rooms').doc(data.chat_id).get()
      })
      .then(chatRef => {
        return chatRef.data()&&chatRef.data().users_count
        // users_count = chatRef.data().users_count
        // return '';
      })
      .then(users_count => {
        // if user was the last on the chat, delete the chat.
        if(users_count && users_count <= 2) {
            //delete chat doc
            admin.firestore().collection("rooms").doc(data.chat_id).delete()

            //return messages collection that will be deleted in the next .then
            return admin.firestore().
            collection('rooms')
            .doc(data.chat_id)
            .collection('messages').get()
        }
        // else, decrement users count
        else if(users_count){
            const decrement = admin.firestore.FieldValue.increment(-1);
            admin.firestore().collection('rooms').doc(data.chat_id).update({
              users_count: decrement
          })
        }
        return undefined
      })
      // in case of deleting the chat, needs to delete the 'messages' collection aswell
      .then(messages_to_delete => {
            if(messages_to_delete === undefined) {
                return undefined
            }
            messages_to_delete.forEach(message => {
                message.ref.delete()
            })
            return admin.firestore().
            collection('rooms')
            .doc(data.chat_id)
            .collection('users_on_page').get()
      })
      //in case of deleting, need to delete the 'users_on_page' collection aswell
      .then(users_to_delete => {
          if(users_to_delete === undefined) {
              return ''
          }
          users_to_delete.forEach(user => {
              user.ref.delete()
              admin.firestore()
                  .collection('users')
                  .doc(user.data().uid)
                  .update({
                      chat_id: admin.firestore.FieldValue.delete()
                  })
          })
          return ''
      })
      .catch(error => {
          throw error
      })
})


/* adds user to chat.
    the algorithm is:
    1. search for opened chats with users amount that is lower or equal to 2.
    2. sort them by timestamp, and then by users amount.
    3. choose the first from the list above.
    4. if it was undefined, opens new chat for the user.
    our goal is to prioritze rooms with only 1 user that is waiting for chat to open.
    @ param data = {user_nickname, course_title, hobby} */
exports.addUserToChat = functions.https.onCall((data,context) => {
    functions.logger.log("I'm adding user to chat!")
    return admin.firestore().collection('rooms')
    .where('course_title' ,'==',data.course_title)
    .where('users_count','<=',2)
    .orderBy('users_count')
    .orderBy('timestamp_start')
    .limit(1)
    .get().then(snapshot => {
      //return one room from the list, if no exist returns undefined
     return snapshot.docs[0]
    })
    .then(room => {
        // if not room found, create one
        if(room === undefined){
            return admin.firestore().collection('rooms').add({
                timestamp_start: admin.firestore.FieldValue.serverTimestamp(),
                course_title: data.course_title
            })
        }
        else {
            // room start to be active
            if (room.data().users_count === 1){
                room.ref.update({
                    timestamp_start_active: admin.firestore.FieldValue.serverTimestamp()
                })
            }
            return room.ref
        }
    })
    .then(roomRef => {
        if(data.course_title === "צ'אט חברתי"){
            roomRef.collection('users_on_page')
                .add({
                    nickname: data.user_nickname,
                    user_name: context.auth.token.email.split('@')[0],
                    user_uid: context.auth.uid,
                    user_hobby: data.hobby,
                    user_color: data.color

                })
        }
        //if chat is not חברתי we won't insert hobby
        else{
            roomRef.collection('users_on_page')
                .add({
                    nickname: data.user_nickname,
                    user_name: context.auth.token.email.split('@')[0],
                    user_uid: context.auth.uid,
                    user_color: data.color
                })
        }
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

/* changes user nick name in users/user.id/nickname
    @param data = {nickname}
 */

exports.setUserNickName = functions.https.onCall((data,context) => {
    return admin.firestore()
    .collection('users')
    .doc(context.auth.uid)
    .update({
        nickname: data.nickname
    })
    .catch(error => {
        throw error
    })
})