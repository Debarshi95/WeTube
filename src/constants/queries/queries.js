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

export { FETCH_VIDEOS, FETCH_CATEGORY, FETCH_VIDEO_BY_CATEGORY, FETCH_VIDEO_BY_ID };
