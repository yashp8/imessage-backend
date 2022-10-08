import {gql} from "apollo-server-core";

const typeDefs = gql`

    type Query {
        searchUsers(username: String): [SearchedUser]
    }

    type Mutation {
        createUsername(username: String): CreateUsernameResponse
    }

    type SearchedUser {
        id: String
        username: String
    }

    type CreateUsernameResponse {
        success: Boolean
        error: String
    }
`;

export default typeDefs;