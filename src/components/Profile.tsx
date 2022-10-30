import React from "react";
import {useAuth0} from "@auth0/auth0-react";

export function IsAdmin(){
    const { user } = useAuth0()
    return user?.email == "admin@admin.com"
}

export function IsLoggedIn(){
    const { isAuthenticated } = useAuth0()
    return isAuthenticated
}

export function GetUsername(){
    const { user } = useAuth0()
    return (user?.email ===  undefined) ? "" : user.email
}