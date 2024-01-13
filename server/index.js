import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv';
// dotenv.config()
const supabaseUrl = process.env.SUPABASE_URL
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY)
const resolvers={
    Query:{
       async users(_,args){
            try{
                let { data: User, error } = await supabase.from('User').select('*').range(0, Number(args.range))
                if(error){
                    throw error.message
                }
                console.log(User)
                return User
            }
            catch(err){
                console.log(err)
                return err
            }
           
        },
       async user(_,args){
            try{
                let { data: User, error } = await supabase.from('User').select("*").eq('id',Number(args.id))
                if(error){
                    throw error.message
                }
                console.log(User,"Single User")
                return User[0]
             }
             catch(err){
                console.log(err)
                return err
             }
          },
    },
    Mutation:{
       async addUser(_,args){
        const tempData={...args.user,profile_pic:"https://i.pravatar.cc/48?u=118836"}
        try{
            const { data, error } = await supabase.from('User').insert([tempData]).select()
            if(error){
                throw error.message
            }
            console.log(data)
            return data[0]
         }
        catch(err){
            console.log(err)
            return err
        }
       
       },
       async updateUser(_,args){
        try{
            const { data, error } = await supabase.from('User').update(args.user).eq('id', args.id).select()
            if(error){
                throw error.message
            }
            console.log(data)
            return data[0]
        }
        catch(err){
            console.log(err)
            return err
        }
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