
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate, useParams } from "react-router";


export function NavProjects({ history }) {
 
  const navigate = useNavigate();
  const { openMobile , setOpenMobile} = useSidebar()
  
  

  const handleChatNav = (chatid) => {
    if (openMobile) {
      navigate(`/dashboard/chat/${chatid}`);
      setTimeout(() => {
        setOpenMobile((open) => !open);
      }, 150);
    } else {
      navigate(`/dashboard/chat/${chatid}`);
    }
  };
  const param = useParams();
  const { id } = param;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarMenu>
        {!history ? (
          <SidebarMenuItem>there are no chats</SidebarMenuItem>
        ) : (
          history.map((item) => {
            return (
              <SidebarMenuItem key={item._id}>
                <SidebarMenuButton
                  className={`${
                    item._id == id &&
                    "bg-accent-foreground text-accent hover:bg-accent-foreground hover:text-accent "
                  } cursor-pointer`}
                  asChild
                  onClick={() => handleChatNav(item._id)}
                >
                  
                  <span className="text-ellipsis  py-5">{item.title == undefined ? <div className="w-full h-7 rounded-lg p-1 bg-black animate-pulse"></div> : item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })
        )}

        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            {/* <MoreHorizontal className="text-sidebar-foreground/70" /> */}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
