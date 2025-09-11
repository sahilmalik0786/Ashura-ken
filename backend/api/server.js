import '../src/env.js'
import app from '../src/app.js'
import { initSocket } from '../src/sockets/socket.js'
import {createServer} from 'http'
import { connectToDb } from '../src/db/db.js'


const httpServer = createServer(app)    

connectToDb()
initSocket(httpServer)




// httpServer.listen(3000, ()=>{
//     console.log('server is running on port 3000')
    
// })
