export default `
    type User {
        id: ID!
        username: String!
        role: String!
    }
    
    type AuthPayload {
        token: String!
        user: User!
    }
`