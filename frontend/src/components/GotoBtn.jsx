import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'

const GotoBtn = ({children , desti , size='default' , variant='default' }) => {
    const navigate = useNavigate()
    const handleDesti = ()=>{
        navigate(desti)
    }
  return (
    <Button onClick={handleDesti} size={size} variant={variant}>
     {children}
    </Button>
  )
}

export default GotoBtn