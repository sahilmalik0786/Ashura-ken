"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLoaderData, useNavigate } from "react-router";
import { useChatId } from "@/hooks/useChatId";
import { queryClient } from "@/queryClient";
import { BookText, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

export function NavMain({ items, create ,itm }) {
  const navigate = useNavigate();
  const chatId = useChatId();
  const isMobile = useIsMobile()
  const {setOpen , open , openMobile , setOpenMobile} = useSidebar()
  console.log(openMobile)
  const handleCreateChat = async () => {
   if(openMobile){
     navigate('/dashboard/newchat')
     setTimeout(()=>{
       setOpenMobile(open=>!open)
     }, 150)
   }
   else{
    navigate('/dashboard/newchat')
   }
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem onClick={() => navigate('/dashboard')} key={item.title}>
            <SidebarMenuButton className="cursor-pointer" tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {create.map((item) => (
          <SidebarMenuItem onClick={handleCreateChat} key={item.title}>
            <SidebarMenuButton className="cursor-pointer" tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
        ))}
         {itm.map((itm) => (
           <Collapsible
            key={itm.title}
            asChild
            defaultOpen={itm.isActive}
            className="group/collapsible"
          >
        <SidebarMenuItem >
          {/* <SidebarMenuButton className={'cursor-pointer'}> */}
       
            <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={itm.title}>
                  {itm.icon && <itm.icon />}
                  <span>{itm.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {itm.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                          
                          <span onClick={()=>navigate(subItem.url)}>{subItem.title}</span>
                          
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
           </Collapsible>
         ))}
          {/* </SidebarMenuButton> */}
        {/* </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}

//       try {
//       const chatID =  await chatId.mutateAsync(); // calls backend

//   // await queryClient.invalidateQueries();

//       await queryClient.invalidateQueries({ queryKey: ["chats"] })
//       navigate(`/dashboard/chat/${chatID?.id}`); // redirect after success
// } catch (err) {
//   console.error("chat Id not generated:", err);
// }
