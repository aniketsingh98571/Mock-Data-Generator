# A graphql API that return user profile. We will use apollo server, supabase for storing user profiles.
# developers can also request for all users in a list or single user using id.
# this will be openly available to developers for making API calls and get mock data for their frontend project
schema={
    name,profile pic,title,socials,occupation
}
# profile pic, we can add it from db, not let user add it from their side, due to nudity scenarious.
# error handling, security via api key, rate limiting, api key.
# we can make a small frontend, to get the api key and document the API calling requests.
# GET, PUT, POST ACTIONS, like 
# get either all users or single user.
# update a user
# post a user.
# For sending the user list, we can make use of pagination.
# some warnings also, like your data will be public, so make sure to enter  proper information
