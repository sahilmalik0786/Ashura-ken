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
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";

import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function NavMain({ items, create, itm }) {
  const navigate = useNavigate();

  const { openMobile, setOpenMobile } = useSidebar();

  const handleCreateChat = async () => {
    if (openMobile) {
      navigate("/dashboard/newchat");
      setTimeout(() => {
        setOpenMobile((open) => !open);
      }, 150);
    } else {
      navigate("/dashboard/newchat");
    }
  };
  const handlePromptsNav = (itemUrl) => {
    if (openMobile) {
      navigate(itemUrl);
      setTimeout(() => {
        setOpenMobile((open) => !open);
      }, 150);
    } else {
      navigate(itemUrl);
    }
  };

  const handleHomeNav = ()=>{
    if(openMobile){
      navigate('/dashboard')
      setTimeout(()=>{
        setOpenMobile(open=>!open)
      } ,150)
    } else {
      navigate('/dashboard')
    }
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            onClick={handleHomeNav}
            key={item.title}
          >
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
            <SidebarMenuItem>
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
                        <span onClick={() => handlePromptsNav(subItem.url)}>
                          {subItem.title}
                        </span>
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

