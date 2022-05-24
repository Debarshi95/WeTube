import { useQuery } from '@apollo/client';
import { Card, Loader } from 'components';
import { FETCH_VIDEOS } from 'constants/queries/queries';
import './Home.css';

const Home = () => {
  const { data, loading } = useQuery(FETCH_VIDEOS);

  return (
    <section className="Home__root">
      {!loading ? (
        <article className="Home__cardContainer">
          {data?.videos?.map((video) => (
            <Card item={video} key={video.id} />
          ))}
        </article>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Home;
