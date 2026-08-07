import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          ratingAverage
          reviewCount
          ownerAvatarUrl
          stargazersCount
          forksCount
          language
        }
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
  }
}
`;