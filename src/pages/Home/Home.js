import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@apollo/client';
import { FaUserCircle } from 'react-icons/fa';
import { Card, Text } from 'components';
import { FETCH_VIDEOS } from 'constants/queries/queries';
import './Home.css';

const Home = () => {
  const { data, loading } = useQuery(FETCH_VIDEOS);

  return (
    <section className="Home__root">
      {loading && (
        <Skeleton
          count={9}
          inline
          className="SkeletonCard"
          containerClassName="SkeletonContainer"
          baseColor="#1a1616bd"
          enableAnimation={false}
        />
      )}
      <article className="Home__cardContainer">
        {!loading &&
          data?.videos?.map((video) => (
            <Card item={video} key={video.id}>
              <Card.Image src={video.thumbnail} alt={video.title} height="13rem" />
              <Card.Content role="button" tabIndex={0} className="Card__content">
                <Text className="Text--ellipsis">{video.title}</Text>

                <div className="d-flex items-center content-between my-1">
                  <Text variant="div" className="d-flex items-center">
                    <FaUserCircle className="Card_icon" />
                    <Text size="xs" className="text-bold">
                      {video?.user?.username}
                    </Text>
                  </Text>
                  <Text size="xs" align="start">
                    <span className="text-bold px-1">Views {video?.views}</span>
                  </Text>
                </div>
              </Card.Content>
            </Card>
          ))}
      </article>
    </section>
  );
};

export default Home;
