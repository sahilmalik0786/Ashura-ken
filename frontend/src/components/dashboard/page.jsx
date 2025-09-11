import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,

} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

import { Outlet, useLocation} from "react-router"
import { DotBackground } from "../background-pattern"


export default function DashboardComp() {
  const location = useLocation()
  const [breadValue , setBreadValue] = useState('')

  useEffect(()=>{
       location.pathname=='/dashboard' && setBreadValue('Dashboard')
       location.pathname=='/dashboard/prompts/:id' && setBreadValue('Your Prompts')
       location.pathname=='/dashboard/newchat' && setBreadValue('New Chat')
       location.pathname=='/dashboard/prompt/save' && setBreadValue('Save Prompts')
       location.pathname=='/dashboard/prompt/explore' && setBreadValue('Explore')
       location.pathname=='/dashboard/prompt' && setBreadValue('Your Prompts')


  },[location])
  
  return (
    <SidebarProvider>
      <AppSidebar  />
      <SidebarInset className={'bg-transparent'}>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
            <BreadcrumbItem>
            {breadValue}
            </BreadcrumbItem>
            </Breadcrumb>
           
          </div>
        </header>
         <DotBackground />
          <Outlet />
      
      </SidebarInset>
    </SidebarProvider>
  )
}
