import { useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import { Loader, Text, Card, PlayerCard, VideoPlayer } from 'components';
import { FETCH_VIDEO_BY_ID, FETCH_VIDEOS } from 'constants/queries/queries';
import './Video.css';

const Video = () => {
  const { state } = useLocation();

  const { data, loading, refetch } = useQuery(FETCH_VIDEO_BY_ID, {
    variables: {
      videoId: state?.id || '',
    },
  });

  const { data: videoData } = useQuery(FETCH_VIDEOS);

  const md = useMediaQuery({ minWidth: 768 });

  if (loading) return <Loader />;

  return (
    <section className="Video__root">
      <article className="Video__container">
        {data?.video && (
          <PlayerCard
            shouldAddToView
            enableWatchLater
            enablePlaylist
            refetchVideos={refetch}
            video={data.video}
            ellipsisText={!md}
          >
            <VideoPlayer url={data.video.url} className="Video__playerCard" />
          </PlayerCard>
        )}
      </article>
      <div className="Video__watchContainer">
        <Text size="md" className="text-bold mb-1">
          Watch More
        </Text>

        {videoData?.videos?.slice(8, 16).map((video) => (
          <Card
            className="Video__card"
            key={video.id}
            item={video}
            imgProps={{
              width: '100%',
              height: md ? '18rem' : '14rem',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Video;
