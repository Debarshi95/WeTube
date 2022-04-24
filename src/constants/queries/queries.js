const { gql } = require('@apollo/client');

const FETCH_VIDEOS = gql`
  query getVideos {
    videos: getAllVideos {
      id
      title
      description
      likes
      viewCount
      url
      imageUrl
      uploadedBy {
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
      likes
      viewCount
      url
      imageUrl
      uploadedBy {
        username
      }
    }
  }
`;

export { FETCH_VIDEOS, FETCH_CATEGORY, FETCH_VIDEO_BY_CATEGORY };
