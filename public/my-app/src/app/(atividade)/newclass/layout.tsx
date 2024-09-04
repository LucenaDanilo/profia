import { getServerSession } from "next-auth"
import nextAuthOptions from '@/app/auth';

import { redirect } from "next/navigation"

export default async function layout({children} :{children: React.ReactNode}){
    const session = await getServerSession(nextAuthOptions)
    if(!session || session?.user.userRole == 'ROLE_STUDENT'){
        redirect('/login')
    }
    return(<>{children}</>)
}