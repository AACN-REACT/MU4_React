import * as React from 'react'

 



export function UserLog({profile, isAuthenticated, logout}){



    return (
        <div className="userlog-container">
            <div>
                welcome, <span>{isAuthenticated?profile.given_name:"guest"}</span>
            </div>
            {isAuthenticated?<button onClick={e=>{alert("logging out"); logout()}} >Logout</button>:
            <button onClick={e=>window.location.href=window.location.origin}>Login</button>}
        </div>
    )

}