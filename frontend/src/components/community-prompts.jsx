import { useCommPrompt } from '@/hooks/useCommPrompt';
import React, { useRef } from 'react'
import HoverCard from './hoverCard';
import { Loader } from './ui/shadcn-io/ai/loader';
import { useIsMobile } from '@/hooks/use-mobile';


const CommunityPrompts = () => {
     const { data, isLoading } = useCommPrompt();
     const isMoblie = useIsMobile()
      const scrollRef = useRef();
      let startX, scrollLeft;
      let isDown = false;
      const handleMouseDown = (e) => {
        if(!isMoblie){
          isDown = true;
        const slider = scrollRef.current;
       
        slider.classList.add("cursor-grabbing");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        } 
        
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
     <div className="w-full max-w-5xl  mx-auto  rounded-xl px-2">
        <h2 >Community Prompts</h2>
        <div  
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="w-full flex flex-nowrap cursor-grab  overflow-y-hidden  select-none p-1 gap-3 snap-x  scroll-smooth snap-mandatory"
        >
          {isLoading ? (
            <Loader />
          ) : (
            Array.isArray(data) &&
            data.map((i) => <HoverCard key={i._id} i={i} />)
          )}
        </div>
      </div>
  )
}

export default CommunityPrompts