import { gql } from 'apollo-angular';

export const GET_FEED = gql`
  query GetFeed {
    feed {
      count
      posts {
        id
        imageUrl
        text
        title
        description
        votes {
          id
        }
        categories {
          id
          title
        }
      }
    }
  }
`;

export const GET_LINK_BY_ID = gql`
  query GetLink($id: String!) {
    post(id: $id) {
      id
      imageUrl
      text
      title
      description
    }
  }
`;

export const GET_SEARCH_POST = gql`
  query SearchPost($filter: String!) {
    feed(filter: $filter) {
      count
      posts {
        id
        imageUrl
        text
        description
        postedBy {
          id
          name
        }
        votes {
          id
        }
      }
    }
  }
`;

export const GET_CATEGORY_POSTS = gql`
  query SearchPostByCategory($id: ID!) {
    category(id: $id) {
      id
      title
      posts {
        id
        title
        description
        imageUrl
        votes {
          id
        }
        categories {
          id
          title
        }
      }
    }
  }
`;
