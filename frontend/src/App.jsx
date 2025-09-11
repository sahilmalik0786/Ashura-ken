
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import { Toaster } from './components/ui/sonner'
import { BackgroundPattern, DotBackground } from './components/background-pattern'


const App = () => {
  return (
     <div className='font-sans '> 
    
      <Navbar />

        <Outlet />
   
      <Toaster />
     </div>
  )
}

export default App