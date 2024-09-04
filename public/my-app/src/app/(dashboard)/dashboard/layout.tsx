// @ts-ignore
import { getServerSession } from "next-auth"
import nextAuthOptions from '@/app/auth';

import { redirect } from "next/navigation"

export default async function layout({children}: {children: React.ReactNode}){

    const session = await getServerSession(nextAuthOptions)

    console.log(session)
    if(!session){
        redirect('/login')
    }
    return <>{children}</>
}