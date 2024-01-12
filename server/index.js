import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config()
const supabaseUrl = process.env.SUPABASE_URL
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY)
const resolvers={
    Query:{
       async users(_,args){
             let { data: User, error } = await supabase.from('User').select('*').range(0, Number(args.range))
             console.log(User)
             return User
        },
       async user(_,args){
            let { data: User, error } = await supabase.from('User').select("*").eq('id',Number(args.id))
            console.log(User,"Single User")
            return User[0]
        },
    },
    Mutation:{
        addUser(_,args){
           
        },
        updateUser(_,args){
            
        }
    }
   
}
const server = new ApolloServer({
    typeDefs,
    resolvers
})
const {url}=await startStandaloneServer(server,{
    listen:{port:4000}
})
console.log("server is listening to port 4000")