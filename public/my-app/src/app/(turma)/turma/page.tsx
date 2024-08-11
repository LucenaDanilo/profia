'use client'
import Header from "../../(componentes)/Header"
import { useState } from "react"
import Aside from "@/app/(componentes)/Aside"
import UpdateExam from "@/app/(componentes)/UpdateExam"
import Table from "@/app/(componentes)/Table"

export default function page(){
    
    return(
        <>
            <Header/>
            <div className="flex">
                <Aside/>
                <h1>Botao pra ir criar atividade</h1>
                <Table/>
            </div>
       
        </>
    )

}