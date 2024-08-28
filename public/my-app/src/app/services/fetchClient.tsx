"use client"
import { getCookie } from "cookies-next"
import { signOut } from "next-auth/react"
import apiUrl from "./utils"
export const fetchClient = async(
    input: string | URL | Request,
    init?: RequestInit
): Promise<Response> => {
    const jwt = getCookie("jwt");
    console.log(jwt)
    const response = await fetch(`${apiUrl}${input}`,{
        ...init,
        headers:{
            ...init?.headers,
            ...(jwt && {Authorization: `Bearer ${jwt}`})
        },
    });
    if(response.status === 401){
        await signOut();
    }
    return response;
}