import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const databse = new Database()

export const routes =[
    {
        method: 'GET',
        path :buildRoutePath('/users'),
        handler : (req, res )=>{

            
        const users = databse.select('users')

        return res.end(JSON.stringify(users))

        },
    },

    {
        method: 'POST',
        path :buildRoutePath('/users'),
        handler : (req, res )=>{
            
            const {name, email} = req.body
        

            const user = ({
                id:randomUUID(),
                name,
                email,
            })
    
            databse.insert('users',user)
            return res.writeHead(201).end()
            
        },
    },
    {
        method:'DELETE',
        path :buildRoutePath('/users/:id'),
        handler : (req, res)=>{
            return res.end()

        },
    }

]