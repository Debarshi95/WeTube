import { gql } from '@apollo/client';

const fragments = {
  views: gql`
    fragment ViewFragment on Video {
      id
      views {
        id
        user {
          id
        }
      }
    }
  `,
  likes: gql`
    fragment LikeFragment on Video {
      likes {
        id
        user {
          id
        }
      }
    }
  `,
  watchLater: gql`
    fragment WatchLaterFragment on Video {
      watchLater {
        id
        user {
          id
        }
      }
    }
  `,
  videos: gql`
    fragment VideoFragment on Video {
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
        id
      }
    }
  `,
};
export default fragments;
