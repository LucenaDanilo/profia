import React from 'react'
import Github from '@/app/(icons)/Github'
import Google from '@/app/(icons)/Google'

import LoginSocialButton from './Social'

function SocialLoginGithub() {
  const callbackUrl = `${process.env.NEX_PUBLIC_URL}`
  return (
    <div className='flex flex-col gap-4'>
          <LoginSocialButton provider='google' callbackUrl={callbackUrl}>
          <div className='py-1.5 border border-black flex items-center justify-center gap-2 rounded-md hover:bg-gray-200 hover:cursor-pointer'><Google/> Google
          </div>
          </LoginSocialButton>
      </div>
  )
}

export default SocialLoginGithub