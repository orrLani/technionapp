import React from 'react'

function Closed() {
    return (
        <div style={{display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Heebo'}}>
            <div style={{justifyContent: 'center'}}>
                <h1>האתר יפתח ב19:00</h1>
            </div>
            <div style={{justifyContent: 'center',alignItems: 'center'}}>
                <img src={"https://s.clipartkey.com/mpngs/s/291-2915804_homer-simpson-sleeping.png"} />
            </div>
            <div  dir="rtl" style={{justifyContent: 'center'}}>
                <h2>נשמח לראותכם!</h2>
            </div>
        </div>
    )
}

export default Closed
