import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@apollo/client';
import { Card } from 'components';
import { FETCH_VIDEOS } from 'constants/queries/queries';
import './Home.css';

const Home = () => {
  const { data, loading } = useQuery(FETCH_VIDEOS);

  return (
    <section className="Home__root">
      {loading && (
        <Skeleton
          count={12}
          inline
          className="SkeletonCard"
          containerClassName="SkeletonContainer"
          baseColor="#2b2a2a77"
          highlightColor="#2d3030"
        />
      )}
      <article className="Home__cardContainer">
        {!loading && data?.videos?.map((video) => <Card item={video} key={video.id} />)}
      </article>
    </section>
  );
};

export default Home;
