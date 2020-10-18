import React, { useEffect, useState } from "react";
import app,{db} from "./firebase.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [currentUserNickName,setCurrentUserNickName] = useState("מצטיין נשיא 442")
  const [nickNameHasChanged,setNickNameHasChanged] = useState(false)

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log("auth changed!")
      setCurrentUser(user)

      //get the user's last nickname
      if (user) {
        db.collection('users').doc(user.uid).onSnapshot(snap => {
          if(snap.data()){
            setCurrentUserNickName(snap.data().nickname)
          }
        })
      }

      setPending(false)
    });
  }, []);

  
  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserNickName,
        setCurrentUserNickName,
        nickNameHasChanged,
        setNickNameHasChanged
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};