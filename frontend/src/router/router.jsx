import { createBrowserRouter, redirect } from "react-router";
import { queryClient } from "@/queryClient";
import { fetchUser } from "@/features/fetchUser";
import App from "../App";

import Home from "../pages/Home";

import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import Dashboard from "@/pages/Dashboard";
import Chats from "@/components/dashboard/chats";

import Prompts from "@/components/dashboard/prompts";
import DashIndex from "@/components/dashboard";
import Explorer from "@/components/dashboard/explorer";
import SavePrompt from "@/components/dashboard/save-prompt";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth",
        children: [
           {
            path:'/auth/login',
            element:<LoginPage />
           },
           {
            path:'/auth/register',
            element:<RegisterPage />
           }
        ],
      },
      {
        path:'/dashboard',
        loader: async ()=>{
           try {      
                const me = await queryClient.fetchQuery({                  
                  queryKey: ["me"],
                  queryFn: fetchUser,
                });
               
                  return { me };
              } catch {
                throw redirect('/auth/login');
              }
        },
        Component:Dashboard,
         
        children:[
          {
            index:true,
            Component:DashIndex
          },
          {
            path:'/dashboard/newchat',
            Component:Chats
          },
          {
            path:'/dashboard/prompt',
            Component:Prompts
          },
          {
            path:'/dashboard/prompt/explore',
            Component:Explorer
          },
          {
            path:'/dashboard/prompt/save',
            Component:SavePrompt
          },
          {
            path:'/dashboard/chat/:id',
            // loader: async ()=>{
            //  const mutationCache = queryClient.getMutationCache().getAll()
            //   return {mutationCache}
            // },
            Component:Chats
          }
        ]
      }
    ],
  },
]);

export default Router;
