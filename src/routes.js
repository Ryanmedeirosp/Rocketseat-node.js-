import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"
import path from "node:path"
import { title } from "node:process"

const databse = new Database()

export const routes =[
    {
        method: 'GET',
        path :buildRoutePath('/task'),
        handler : (req, res )=>{

        const{search} = req.query

        const users = databse.select('task', search?{
            title:search,
            description:search,
        }:null)

        return res.end(JSON.stringify(users))

        },
    },

    {
        method: 'POST',
        path :buildRoutePath('/task'),
        handler : (req, res )=>{
            
            const {title, description} = req.body
            const data = new Date()
            

            const user = ({
                id:randomUUID(),
                title,
                description,
                completed_at : null,
                created_at: data.toUTCString(),
                updated_at:data.toUTCString(),

            })
    
            databse.insert('task',user)
            return res.writeHead(201).end()
            
        },
    },
    {
        method:'DELETE',
        path :buildRoutePath('/task/:id'),
        handler : (req, res)=>{

           const {id} = req.params

           databse.delete('task', id)
           return res.writeHead(204).end()

        },
    },
    {
        method:'PUT',
        path :buildRoutePath('/task/:id'),
        handler : (req, res)=>{

           const {id} = req.params

           const {title, description, updated_at} = req.body

            databse.alterar('task',id,title,description,updated_at)

          
           return res.writeHead(204).end()

        },
    },{
        method:'PATCH',
        path :buildRoutePath('/task/:id/complete'),
        handler : (req, res)=>{

           const {id} = req.params
           
            databse.completar('task',id)

          
           return res.writeHead(204).end()

        },
    }

]