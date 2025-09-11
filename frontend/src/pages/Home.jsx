import { BackgroundPattern, DotBackground } from "@/components/background-pattern"
import GotoBtn from "@/components/GotoBtn"

import { useAuth } from "@/hooks/useAuth"


const Home = () => {
  const {isAuthenticated} = useAuth()
  return (
    <div className="min-h-[calc(100vh-3.5rem)] max-w-4xl  border-l border-r mx-auto p-2 relative  flex not-sm:p-3 items-center justify-center">
       
          <DotBackground />
        
      <div className="flex flex-col gap-5 items-center ">
        <h1 className="text-2xl text-center not-sm:text-xl  selection:text-accent text-shadow-accent">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum corporis, quis impedit sequi facilis fuga placeat explicabo harum temporibus. Modi saepe expedita temporibus obcaecati, deserunt, incidunt ipsam magnam quasi ab blanditiis sunt?
        </h1>
         {isAuthenticated ? (
            <GotoBtn
              children={"Dashboard"}
              desti={"/dashboard"}
              size="sm"
              variant="outline"
            />
          ) : (
            <GotoBtn
              children={"Get Started"}
              desti={"/auth/login"}
              size="sm"
              variant="outline"
            />
          )}
      </div>
   
    </div>
  )
}

export default Home 