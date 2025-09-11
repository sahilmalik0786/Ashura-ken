import { LoginForm } from '@/components/login-form'
import React from 'react'

const LoginPage = () => {
  return (
       <div className="flex min-h-[calc(100vh-4rem)]  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage