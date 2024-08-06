import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const databse = new Database()

export const routes =[
    {
        method: 'GET',
        path : '/users',
        handler : (req, res )=>{

            
        const users = databse.select('users')

        return res.end(JSON.stringify(users))

        }
    },
    
    {
        method: 'POST',
        path : '/users',
        handler : (req, res )=>{
            
            const {name, email} = req.body
        

            const user = ({
                id:randomUUID(),
                name,
                email,
            })
    
            databse.insert('users',user)
            return res.writeHead(201).end()
            
        }
    }

]