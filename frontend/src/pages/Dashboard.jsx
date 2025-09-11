import DashboardComp from '@/components/dashboard/page'
import { useMe } from '@/hooks/useMe'
import React from 'react'
import { useLoaderData } from 'react-router'

const Dashboard = () => {
    // const {me} = useLoaderData()
    
    
  return (
    <DashboardComp />
  )
}

export default Dashboard