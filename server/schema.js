export const typeDefs=`#graphql
    type User {
        id:ID!,
        name:String!,
        profile_pic:String!
        title:String!
        socials:[String!]
        occupation:String!
    }
    type ApiKey{
        key:String
    }
    type Query{
        users(range:Int!,key:String!): [User]
        user(id:ID!,key:String!):User
        generateApiKey:ApiKey
    }
   type Mutation{
        addUser(user:AddUserInput!,key:String!):User
        updateUser(id:ID!,user:EditUserInput!,key:String!):User
     }
   type Error {
        message: String
    }
    input AddUserInput{
        name:String!,
        profile_pic:String
        title:String!
        socials:[String!]
        occupation:String!
      }
    input EditUserInput{
        name:String
        title:String
        occupation:String
        socials:[String!]
   }
`