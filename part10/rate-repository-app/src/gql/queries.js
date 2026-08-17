import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, , $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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

export const GET_ME = gql`
  query getMe($includeReviews: Boolean = false) {
    me{
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            text
            rating
            repositoryId
            user{
              username
            }
          }
        }
      }
  }
  }
`;

export const GET_REPO_DETAILS = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      name
      forksCount
      stargazersCount
      reviewCount
      description
      language
      ratingAverage
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
      rating
      createdAt
      text
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;