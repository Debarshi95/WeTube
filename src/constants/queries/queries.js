const { gql } = require('@apollo/client');

const FETCH_VIDEOS = gql`
  query getVideos {
    videos: getAllVideos {
      id
      title
      description
      url
      thumbnail
      categories {
        name
      }
      user {
        username
      }
    }
  }
`;

const FETCH_CATEGORY = gql`
  query getCategories {
    categories: getAllCategories {
      id
      name
    }
  }
`;

const FETCH_VIDEO_BY_CATEGORY = gql`
  query getVideosByCategory($categoryName: String!) {
    videos: getVideoByCategory(categoryName: $categoryName) {
      id
      title
      description
      url
      thumbnail
      user {
        username
      }
    }
  }
`;

const FETCH_VIDEO_BY_ID = gql`
  query getVideoById($videoId: String!) {
    video: getVideoById(videoId: $videoId) {
      id
      title
      description
      url
      thumbnail
      categories {
        name
      }
      user {
        username
      }
    }
  }
`;

const REGISTER_USER_MUTATION = gql`
  mutation registerUser(
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      username
      token
      email
    }
  }
`;

const FETCH_USER_DATA = gql`
  query fetchUserData($token: String!) {
    user: getUser(token: $token) {
      id
      username
      token
      email
    }
  }
`;
const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser {
      success
      message
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      token
      email
      username
    }
  }
`;

export {
  LOGIN_USER,
  FETCH_VIDEOS,
  FETCH_CATEGORY,
  FETCH_VIDEO_BY_CATEGORY,
  FETCH_VIDEO_BY_ID,
  REGISTER_USER_MUTATION,
  FETCH_USER_DATA,
  LOGOUT_USER,
};
