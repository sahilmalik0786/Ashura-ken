import React from "react";
import { usePrompts } from "@/hooks/usePrompts";
import HoverCard from "../hoverCard";



const Prompts = () => {
  const { data: prompts } = usePrompts();  

  return (
    <div className="w-full h-[calc(100svh-6rem)] p-4">
      <h1 className="mb-2">Saved Prompts</h1>

      <div className="h-fit max-h-full w-full  relative rounded-lg p-3 grid xl:grid-cols-3 sm:grid-cols-1 gap-3 overflow-y-auto">
        {Array.isArray(prompts) &&
          !prompts.length == 0 &&
           prompts.map((i) => {
            return (
                  <HoverCard i={i}/>                  
            );
          })}            
      </div>
    </div>
  );
};

export default Prompts;


