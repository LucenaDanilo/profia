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
                   
                </div>
                <Table/>
            </div>
       
        </>
    )

}