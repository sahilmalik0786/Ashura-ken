import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
// import { Item } from "@radix-ui/react-dropdown-menu";

export function NavProjects({
  history , 
  selected,
  setSelected
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  
  // console.log(history)
   
  // if(!history){
  //   return   <SidebarGroup className="group-data-[collapsible=icon]:hidden">
  //     <SidebarGroupLabel>History</SidebarGroupLabel>
     
        
  //   </SidebarGroup>
  
    
  // }
  const param = useParams()
  const {id} = param

  // useEffect(()=>{
  //     {id == }
  // })
  return ( 
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>History</SidebarGroupLabel>
    <SidebarMenu>

      {!history ?  <SidebarMenuItem>
        there are no chats
      </SidebarMenuItem>: history.map((item)=>{
        
        return <SidebarMenuItem>
             <SidebarMenuButton className={`${item._id == id && 'bg-accent-foreground text-accent hover:bg-accent-foreground hover:text-accent'} cursor-pointer`}  asChild onClick={()=>navigate(`/dashboard/chat/${item._id}`)}>
                         
                            <span>{item.title}</span>

                        </SidebarMenuButton>
        </SidebarMenuItem>
       }) }
      
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            {/* <MoreHorizontal className="text-sidebar-foreground/70" /> */}
            
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
  