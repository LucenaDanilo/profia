'use client'
import Header from "../../(componentes)/Header"
import { useState, useEffect } from "react"
import Aside from "@/app/(componentes)/Aside"
import Table from "@/app/(componentes)/Table"
import { useMyContext } from "@/app/providers/testeprovider"

interface User {
    id: string;
    email: string;
    name: string;
    userRole: string;
}

interface Session {
    user: User;
}

export default function Page() {
    const { soraka } = useMyContext();
   

    return (
        <>
            <Header />
            <div className="flex">
                <h1>{soraka}</h1>
                <Aside />
               
                <Table />
            </div>
        </>
    )
}
