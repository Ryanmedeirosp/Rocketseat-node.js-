import fs from 'node:fs/promises'


const databasePath = new URL('../db.json', import.meta.url)



export class Database{

    #database ={}

    constructor(){
        fs.readFile(databasePath, 'utf8')
        .then(data=>{
            this.#database = JSON.parse(data)
        })
        .catch(()=>{
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search){
        let data = this.#database[table] ?? []

        if(search){
            data = data.filter(row => {
                return Object.entries(search).some(([key, value])=>{
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist();
        return data;
    }

    delete(table,id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if(rowIndex >-1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    alterar(table, id, title, description){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        const data = new Date()

        if(rowIndex >-1){
            if(!title){
                this.#database[table][rowIndex].description = description
                return this.#database[table][rowIndex].updated_at = data.toUTCString()
            }
            if(!description){
                this.#database[table][rowIndex].title = title
                return this.#database[table][rowIndex].updated_at = data.toUTCString()
            }

            this.#database[table][rowIndex].title = title
            this.#database[table][rowIndex].description = description
            this.#database[table][rowIndex].updated_at = data.toUTCString()
            this.#persist()
        }
    }

    completar(table,id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        const data = new Date()
        
        if(rowIndex >-1){
            if(this.#database[table][rowIndex].completed_at){
                return
            }

            this.#database[table][rowIndex].completed_at = true
            this.#database[table][rowIndex].updated_at = data.toUTCString()

        }
    }
    
}