export const typeDefs=`#graphql
    type User {
        id:ID!,
        name:String!,
        profile_pic:String!
        title:String!
        socials:[String!]
        occupation:String!
    }
    type Query{
        users(range:Int!): [User]
        user(id:ID!):User
    }
    type Mutation{
        addUser(user:AddUserInput!):User
        updateUser(id:ID!,user:EditUserInput!):User
    }
    input AddUserInput{
        name:String!,
        profile_pic:String!
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