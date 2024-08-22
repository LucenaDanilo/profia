// @ts-ignore
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function layout({children}: {children: React.ReactNode}){

    const session = await getServerSession(nextAuthOptions)

    console.log('to buscando vc', session?.user.email)
    if(!session){
        redirect('/login')
    }
    return <>{children}</>
}