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
      categoryId {
        id
        name
      }
    }
  }
`;

export { FETCH_VIDEOS };
