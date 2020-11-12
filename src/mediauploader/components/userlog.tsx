import * as React from 'react'

 



export function UserLog({profile, isAuthenticated, logout}){



    return (
        <div className="userlog-container">
            <div className="user-image">
                AACN media uploader
            </div>
            {isAuthenticated?<button onClick={logout} >Logout</button>:
            <button onClick={e=>window.location.href="https://localhost:8080"}>Login</button>}
        </div>
    )

}