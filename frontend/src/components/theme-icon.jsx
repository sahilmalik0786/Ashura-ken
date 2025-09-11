import { AnimatePresence, motion } from "motion/react"
import { useTheme } from "./theme-provider"
import { Sun , Moon} from "lucide-react"
import { ThemeAnimationType, useThemeAnimation } from "@space-man/react-theme-animation"


const ThemeIcon = ({size}) => {
    
    const { theme, toggleTheme, ref } = useThemeAnimation({animationType:ThemeAnimationType.CIRCLE  , easing:'linear' , duration:600 , storageKey:'vite-ui-theme'} )
    return   <button ref={ref} onClick={toggleTheme} className="theme-toggle-btn">
         <AnimatePresence mode="wait">
   {theme === "dark" ? (
    <motion.div
      layout={false}
      initial={{ opacity: 0 ,y:20 }}
      animate={{ opacity: 1 ,y:0}}
      exit={{ opacity: 0 ,y:-20}}
       transition={{ duration: 0.2, ease: "easeInOut" }}
      key="dark"
   
    >
      <Sun className="cursor-pointer" size={size} />
    </motion.div>
  ) : (
    <motion.div
      layout={false}
       initial={{ opacity: 0 ,y:20 }}
      animate={{ opacity: 1 ,y:0}}
      exit={{ opacity: 0 ,y:-20}}
     
       transition={{ duration: 0.2, ease: "easeInOut" }}
      key="light"
    >
      <Moon className="cursor-pointer" size={size} />
    </motion.div>
  )}
</AnimatePresence>
    </button>
} 

  export default ThemeIcon
//  <AnimatePresence mode="wait">
//   {theme === "dark" ? (
    // <motion.div
    //   layout={false}
    //   initial={{ opacity: 0 ,y:20 }}
    //   animate={{ opacity: 1 ,y:0}}
    //   exit={{ opacity: 0 ,y:-20}}
    //    transition={{ duration: 0.2, ease: "easeInOut" }}
    //   onTap={() => setTheme("light")}
    //   key="dark"
    // //   className="inline-block"
    // >
    //   <Sun className="cursor-pointer" size={size} />
    // </motion.div>
//   ) : (
    // <motion.div
    //   layout={false}
    //    initial={{ opacity: 0 ,y:20 }}
    //   animate={{ opacity: 1 ,y:0}}
    //   exit={{ opacity: 0 ,y:-20}}
    //   onTap={() => setTheme("dark")}
    //    transition={{ duration: 0.2, ease: "easeInOut" }}
    //   key="light"
    // >
    //   <Moon className="cursor-pointer" size={size} />
    // </motion.div>
//   )}
// </AnimatePresence>

//   )


