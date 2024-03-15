# Mock Data Generator 🚀

Grab your next batch of mock user data for an exciting boost to your frontend projects! This project uses GraphQL, Apollo Server, and Node.js to generate and manage mock user data. 

## Tools Used 🛠️

- **GraphQL**: A query language for APIs and a runtime for executing those queries with your existing data.
- **Apollo Server**: An open-source, spec-compliant GraphQL server that's compatible with any GraphQL schema.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Supabase**: Supabase is an open source Firebase alternative.
## Deployments 🔄

Deployments are done on the cyclic platform to ensure continuous integration and delivery.

## Actions 🎬

1. **Get Single User**: Fetch details of a single user.
2. **Get List of Users**: Fetch a list of all users.
3. **Add User**: Add a new user to the database.
4. **Update User**: Update details of an existing user.

## Base URL 🌐

The base URL for the project is [https://ruby-precious-moth.cyclic.app](https://ruby-precious-moth.cyclic.app)

## API Queries

### 1. Get API Key

To get the API key, follow the steps shown below:

```javascript
const query = `
    query GetApiKey {
        generateApiKey {
            key
        }
    }
`;

fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
})
.then(response => response.json())
.then(data => console.log('data returned:', data));

```

The API key is necessary for authentication and authorization purposes. It is used to track and control how the API is being used, to prevent abuse and ensure service quality.

Please note that the API key is sensitive information. Do not share it publicly or expose it in your client-side code. Always keep it secure.

### 2. Get Users

To get the users list, follow the steps shown below:-

```javascript
const query = `
    query Users($range: Int!, $key: String!) {
        users(range: $range, key: $key) {
            name
        }
    }
`;

const variables = {
    range: 10, // replace with your actual range
    key: 'API KEY' // replace with your actual key
};

fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query,
        variables
    }),
})
.then(response => response.json())
.then(data => console.log('data returned:', data));
```


### 3. Get a User

To get a single user based on ID, follow the steps shown below:-

```javascript
const query = `
    query User($id: ID!, $key: String!) {
        user(id: $id, key: $key) {
            name
        }
    }
`;

const variables = {
    id: 1, // replace with your actual id,type-integer
    key: 'API KEY' // replace with your actual key
};

fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query,
        variables
    }),
})
.then(response => response.json())
.then(data => console.log('data returned:', data));
```



### 4. Add a User

To add a user, follow the steps shown below:-

```javascript
const mutation = `
    mutation Add($user: AddUserInput!, $key: String!) {
        addUser(user: $user, key: $key) {
            name
        }
    }
`;

const variables = {
    key: 'API KEY', // replace with your actual key
    user: {
        name: '<ANY NAME>', // replace with your actual name
        title: '<ANY TITLE>', // replace with your actual title
        socials: ['<ANY SOCIAL>'], // replace with your actual socials
        occupation: '<ANY OCCUPATION>' // replace with your actual occupation
    }
};

fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: mutation,
        variables
    }),
})
.then(response => response.json())
.then(data => console.log('data returned:', data));
```


### 5. Edit User

To edit a user details, follow the steps shown below:-

```javascript
const mutation = `
    mutation Edit($id: ID!, $user: EditUserInput!, $key: String!) {
        updateUser(id: $id, user: $user, key: $key) {
            name
        }
    }
`;

const variables = {
    id: 1, // replace with your actual id,type-integer
    key: 'API KEY', // replace with your actual key
    user: {
        name: '<ANY NAME>', // replace with your actual name
        title: '<ANY TITLE>', // replace with your actual title
        socials: ['<ANY SOCIAL>'], // replace with your actual socials
        occupation: '<ANY OCCUPATION>' // replace with your actual occupation
    }
};

fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: mutation,
        variables
    }),
})
.then(response => response.json())
.then(data => console.log('data returned:', data));
```


## Contact 📞

If you have any questions, feel free to reach out!


## Quick Notes
1) GraphQL sits between a server and a client, you cannot have it as a layer between server and Database.
2) In our case of Mocky, the apollo server is the GraphQL server(resolver), and from client we are accessing the data based on the defined schema of GraphQL.  
