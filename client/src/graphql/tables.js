import { gql } from "@apollo/client";

export const GET_TABLES = gql`
  {
    tables {
      _id
      name
      prize
      products {
        _id
        name
        prize
        quantity
      }
    }
  }
`;

export const CREATE_TABLE = gql`
  mutation ($name: String) {
    createTable(name: $name) {
      _id
      name
      prize
    }
  }
`;
