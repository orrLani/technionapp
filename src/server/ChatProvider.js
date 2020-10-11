import React, { createContext, useContext, useState } from 'react'

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [chat,setChat] = useState({
        id: null,
        is_loading: true
    })
    return (
        <ChatContext.Provider value={[chat,setChat]}>
            {children}
        </ChatContext.Provider>
    )
}