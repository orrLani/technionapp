import React from 'react'

function Closed() {
    return (
        <div style={{display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Heebo'}}>
            <div style={{justifyContent: 'center'}}>
                <h1>תודה רבה על ההשתפות!</h1>
            </div>
            <div style={{justifyContent: 'center',alignItems: 'center'}}>
                <img alt="homer" src={"https://s.clipartkey.com/mpngs/s/291-2915804_homer-simpson-sleeping.png"} />
            </div>
            <div  dir="rtl" style={{justifyContent: 'center'}}>
                <h2>נשמח למילוי הטופס ששלחנו לכם בווטסאפ :)</h2>
            </div>
        </div>
    )
}

export default Closed
