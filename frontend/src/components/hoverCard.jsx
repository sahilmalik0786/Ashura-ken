import {  motion } from "motion/react";
import { CardContent, CardHeader } from "./ui/card";
import { CheckCheck, Copy, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const HoverCard = ({ i }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async(text) =>{
    console.log(text)
    try {
       await navigator.clipboard.writeText(text)
       .then(()=>{
        setCopied(true)
        setTimeout(()=>{
             setCopied(false)
        } , 1700)
       })
    } catch (error) {
       console.log(error)
    }
  }

  return (
    <>
      <motion.div
      
        key={i._id}
       
        className={
          "h-52 bg-background  text-card-foreground hover:ring-4 hover:ring-accent transition-all duration-200 flex border flex-col gap-6 rounded-xl py-6 shadow-sm antialiased drop-shadow-lg z-10 hover:border-accent"
        }
      >
        <CardHeader className={" "}>
          <motion.div className="drop-shadow-lg">
            <Button variant={'outline'} disabled={copied} onClick={()=>handleCopy(i.prompt)}  className={'size-7 p-1 text-muted-foreground hover:text-foreground flex justify-self-end'}> {copied ? <CheckCheck /> : <CopyIcon  className="size-4"  /> } </Button>
          </motion.div>
          <motion.p
        
            className="line-clamp-4 text-sm fix-3d"
          >
            {i.prompt}
          </motion.p>
        </CardHeader>
        <CardContent className={"flex gap-2"}>
          {i.tags.map((tags) => {
            return (
              <motion.h4
                key={tags}
                style={{ translateZ: 0 }}
                className="px-2 py-1 bg-accent-foreground text-accent rounded-md text-sm fix-3d"
              >
                {tags}
              </motion.h4>
            );
          })}
        </CardContent>
     
      </motion.div>
    </>
  );
};

export default HoverCard;
