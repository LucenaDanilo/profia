'use client'
import Header from "../../(componentes)/Header"
import { useState } from "react"
export default function page(){
    const [teste,setTeste] = useState<string>('')
    
    return(
        <>
            <Header/>
            <button className="p-4 border border-r-2 bg-blue-400 text-white" onClick={() => setTeste('Sorak siul')}>
                clica aqui pra tu ve um negócio
            </button>
            <h1>use state insde session layout</h1>
            <h1>ele mesmo {teste}</h1>
        </>
    )

}