import * as React from "react"

import {
  BotMessageSquare,
  Bot,
  Plus,
  Home,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"

import { useUserChats } from "@/hooks/useUserChats"
import ThemeIcon from "./theme-icon"


const  itm= [
 
    {
      title: "Prompts",
      url: "#",
      icon: Bot,
      isActive:true,
      items: [
        {
          title: "Your Prompts",
          url: "/dashboard/prompt",
        },
        {
          title: "Explorer",
          url: "/dashboard/prompt/explore",
        },
        {
          title: "Save",
          url: "/dashboard/prompt/save",
        },
      ],
    },
   ]


const compdata = {

 app: 
    {
      name: "Ashura Ken",
      logo: BotMessageSquare,
      plan: "Enterprise",
    },
  
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
  
    },
  
  ],
    create:[
        {
        title:'Create New',
        icon: Plus,
        isActive: false,
        url:''
      }
    ],

}

export function AppSidebar({
  ...props
}) {
   const {user} = useAuth()
   
    
   const {data , isLoading} = useUserChats()
   
   return (
   <Sidebar collapsible="icon" {...props}>
     
        <SidebarHeader className="flex flex-row items-center bg-transparent justify-between">

          <TeamSwitcher app={compdata.app} /> 
            <ThemeIcon size="20" />
         
        </SidebarHeader>
        <SidebarContent >
          <NavMain items={compdata.navMain} create={compdata.create} itm={itm} />
          {/* className={`${item ? 'bg-red-900' : ''}`} */}
          {!isLoading && <NavProjects history={data}/>  }
        </SidebarContent>
        <SidebarFooter>
          
           
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  );
}
