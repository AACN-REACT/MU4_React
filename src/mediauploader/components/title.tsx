import * as React from 'react'

import {UserLog} from './userlog'
 



export function Title({profile, isAuthenticated, logout}){



    return (
        <div className="title-container">
            <div className="logo-container">
                AACN media uploader
            </div>
            <UserLog profile={profile} isAuthenticated={isAuthenticated} logout={logout} />

        </div>
    )

}