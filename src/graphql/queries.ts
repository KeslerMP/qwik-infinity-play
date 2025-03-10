export const GET_USERS = `
  query {
    users {
      id
      email
    }
  }
`;

export const CREATE_USER = `
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
      id
      token
    }
  }
`;

export const LOGIN_USER = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        email
        token
      }
    }
`;

export const VALIDATE_TOKEN = `
    mutation ValidateToken($token: String!) {
      validateToken(token: $token) {
        token
        id
        email
      }
    }
`;
