import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import crypto from 'crypto'
// dotenv.config()
const supabaseUrl = process.env.SUPABASE_URL
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY)
const checkApiKey=async(key)=>{
    let { data: Keys, error } = await supabase.from('Keys').select("*").eq('key', key)
    console.log(Keys,"keys")
    if(Keys.length>0){
        return true
    }
    else
        return false
 }
const resolvers={
    Query:{
       async users(_,args){
            try{
                const keyResults = await checkApiKey(args.key)
                console.log(keyResults,"results")
                if(keyResults){
                    let { data: User, error } = await supabase.from('User').select('*').range(0, Number(args.range))
                    if(error){
                        throw new GraphQLError(error.message, {
                            extensions: { code: '500' },
                          });
                    }
                    console.log(User)
                    return User
                }
                else {
                    throw new GraphQLError("Invalid API Key", {
                        extensions: { code: '403' },
                      });
                }
            }
            catch(err){
                console.log(err)
                return err
            }
           
        },
       async user(_,args){
            try{
                const keyResults = await checkApiKey(args.key)
                if(keyResults){
                    let { data: User, error } = await supabase.from('User').select("*").eq('id',Number(args.id))
                    if(error){
                        throw new GraphQLError(error.message, {
                            extensions: { code: '500' },
                        });
                    }
                    console.log(User,"Single User")
                    return User[0]
               }
             else{
                throw new GraphQLError("Invalid API Key", {
                    extensions: { code: '403' },
                  });
            }
             }
             catch(err){
                console.log(err)
                return err
             }
          },
          async  generateApiKey(){
            try{
                const key= crypto.randomUUID();
                const { data, error } = await supabase.from('Keys').insert([{'key':key}]).select()
                if(error){
                    throw new GraphQLError(error.message, {
                        extensions: { code: '500' },
                      });
                }
                return data[0]
            }
            catch(err){
                console.log(err)
                return err
            }
           }
    },
    Mutation:{
       async addUser(_,args){
       try{
            const keyResults = await checkApiKey(args.key)
            if(keyResults){
                const tempData={...args.user,profile_pic:"https://i.pravatar.cc/48?u=118836"}
                const { data, error } = await supabase.from('User').insert([tempData]).select()
                if(error){
                    throw new GraphQLError(error.message, {
                        extensions: { code: '500' },
                    });
                }
                console.log(data)
                return data[0]
          }
         else{
            throw new GraphQLError("Invalid API Key", {
                extensions: { code: '403' },
              });
        }
        }
        catch(err){
            console.log(err)
            return err
        }
       
       },
       async updateUser(_,args){
        try{
            const keyResults = await checkApiKey(args.key)
            if(keyResults){
            const { data, error } = await supabase.from('User').update(args.user).eq('id', args.id).select()
            if(error){
                throw new GraphQLError(error.message, {
                    extensions: { code: '500' },
                  });
            }
            console.log(data)
            return data[0]
        }else{
            throw new GraphQLError("Invalid API Key", {
                extensions: { code: '403' },
              });
        }
        }
        catch(err){
            console.log(err)
            return err
        }
       },
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