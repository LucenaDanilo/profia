import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import MyProvider from "@/app/providers/testeprovider"

export default async function layout({children} :{children: React.ReactNode}){
    const session = await getServerSession(nextAuthOptions)
    
    if(!session){
        redirect('/login')
    }
    return(<><MyProvider>{children}</MyProvider></>)
}