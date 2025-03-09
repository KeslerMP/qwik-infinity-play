export const GET_USERS = `
  query {
    users {
      id
      email
    }
  }
`;

export const CREATE_USER = `
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

