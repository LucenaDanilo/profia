import { getServerSession } from "next-auth"
import nextAuthOptions from '@/app/auth';

import { redirect } from "next/navigation"

export default async function layout({children} :{children: React.ReactNode}){
    const session = await getServerSession(nextAuthOptions)
    let verifyUser = session?.user.userRole == "ROLE_ADMIN"
    console.log(verifyUser)
    if(!verifyUser){
        redirect('/login')
    }
    return(<>{children}</>)
}