'use client'
import Header from "../../(componentes)/Header"
import { useState } from "react"
import Aside from "@/app/(componentes)/Aside"
import UpdateExam from "@/app/(componentes)/UpdateExam"
import Table from "@/app/(componentes)/Table"
import Link from "next/link"
export default function page(){
    
    return(
        <>
            <Header/>
            <div className="flex">
                <Aside/>
                <div>
                    <Link href="/turma/update">
                        <span className="bg-green-700 p-2 text-black">Update</span>
                    </Link>
                </div>
                <Table/>
            </div>
       
        </>
    )

}