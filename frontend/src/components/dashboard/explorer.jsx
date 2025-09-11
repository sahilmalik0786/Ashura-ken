import React, { useRef } from "react";
import { Input } from "../ui/input";
import { CheckCheck, Search } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  PromptInput,
  PromptInputTextarea,
} from "../ui/shadcn-io/ai/prompt-input";
import HoverCard from "../hoverCard";
import { motion } from "motion/react";
import { CardContent, CardHeader } from "../ui/card";
import { useCommPrompt } from "@/hooks/useCommPrompt";
import { Loader } from "../ui/shadcn-io/ai/loader";

const Explorer = () => {
  const { data, isLoading } = useCommPrompt();
  const scrollRef = useRef();
  let startX, scrollLeft;
  let isDown = false;
  const handleMouseDown = (e) => {
    //e.target == scrollRef.current
    isDown = true;
    const slider = scrollRef.current;
    console.log(slider)
    slider.classList.add("cursor-grabbing");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };  

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const slider = scrollRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 4; // scroll speed
    slider.scrollLeft = scrollLeft - walk;
  };
  return (
    <div className=" h-full flex flex-col  px-4 gap-5 w-full ">
      <div className="w-full max-w-4xl mt-4 mx-auto  overflow-hidden rounded-xl border bg-background shadow-sm flex items-center gap-3 hover:border-ring hover:ring-ring/50 hover:ring-[3px] transition-all duration-200 ">
        <input
          type="text"
          placeholder="Search by tags"
          className="w-full p-3 outline-none rounded-xl text-sm"
        />
        <Search className="mr-2 cursor-pointer" />
      </div>

      <div className="w-full max-w-5xl  mx-auto  rounded-xl px-2">
        <h2 >Community Prompts</h2>
        <div  
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="w-full flex flex-nowrap cursor-grab  overflow-y-hidden overflow-x-hidden select-none p-1 gap-3 snap-x  scroll-smooth snap-mandatory"
        >
          {isLoading ? (
            <Loader />
          ) : (
            Array.isArray(data) &&
            data.map((i) => <HoverCard key={i._id} i={i} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
