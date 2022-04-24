import { useQuery } from '@apollo/client';
import { Card, SideDrawer } from 'components';
import { FETCH_VIDEOS } from 'constants/queries/queries';
import './Home.css';

const Home = () => {
  const { data, loading } = useQuery(FETCH_VIDEOS);

  return (
    <section className="Home__root">
      <SideDrawer />
      <div>
        {!loading ? (
          <article className="Home__cardContainer">
            {data?.videos?.map((video) => (
              <Card item={video} key={video.id} />
            ))}
          </article>
        ) : (
          'Loading'
        )}
      </div>
    </section>
  );
};

export default Home;
