import { gql } from '@apollo/client';
import fragments from './fragments';

const FETCH_VIDEOS = gql`
  query getVideos {
    videos: getAllVideos {
      id
      title
      description
      url
      thumbnail
      views
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
      views
      user {
        username
      }
      ...LikeFragment
    }
  }
  ${fragments.likes}
`;

const FETCH_VIDEO_BY_ID = gql`
  query getVideoById($videoId: String!) {
    video: getVideoById(videoId: $videoId) {
      id
      title
      description
      url
      thumbnail
      views
      user {
        username
      }
      ...LikeFragment
    }
  }
  ${fragments.likes}
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

const FETCH_ALL_VIEWS = gql`
  query getAllViews {
    views: getAllViews {
      id
      video {
        id
        title
        description
        url
        thumbnail
        views
        user {
          username
        }
        ...LikeFragment
      }
    }
  }
  ${fragments.likes}
`;

const UPDATE_VIEW = gql`
  mutation UpdateView($videoId: String!) {
    updateView(videoId: $videoId) {
      message
      success
    }
  }
`;
const UPDATE_LIKE = gql`
  mutation UpdateLike($videoId: String!) {
    updateLike(videoId: $videoId) {
      message
      success
    }
  }
`;

const FETCH_USER_PLAYLIST = gql`
  query GetAllPlaylists {
    playlist: getAllPlaylists {
      id
      name
      videos {
        id
        title
        description
        url
        thumbnail
        user {
          username
        }
        views
        ...LikeFragment
      }
    }
  }
  ${fragments.likes}
`;

const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($name: String!, $videoId: String!) {
    createPlaylist(name: $name, videoId: $videoId) {
      message
      success
    }
  }
`;

const UPDATE_PLAYLIST = gql`
  mutation UpDatePlaylist($playlistId: String!, $videoId: String!) {
    updatePlaylist(playlistId: $playlistId, videoId: $videoId) {
      message
      success
    }
  }
`;

const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($playlistId: String!, $videoId: String, $type: String) {
    deletePlaylist(playlistId: $playlistId, videoId: $videoId, type: $type) {
      message
      success
    }
  }
`;

const UPDATE_WATCH_LATER = gql`
  mutation UpdateWatchLater($videoId: String!) {
    updateWatchLater(videoId: $videoId) {
      message
      success
    }
  }
`;

const FETCH_WATCH_LATER = gql`
  query getAllWatch {
    watchs: getAllWatch {
      video {
        id
        title
        description
        url
        thumbnail
        views
        user {
          username
        }
        ...LikeFragment
      }
    }
  }
  ${fragments.likes}
`;

const DELETE_HISTORY = gql`
  mutation DeleteView($viewId: String, $type: String) {
    deleteView(viewId: $viewId, type: $type) {
      message
      success
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
  FETCH_ALL_VIEWS,
  UPDATE_VIEW,
  UPDATE_LIKE,
  FETCH_USER_PLAYLIST,
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_WATCH_LATER,
  FETCH_WATCH_LATER,
  DELETE_HISTORY,
};
