import { useQuery } from '@apollo/client';
import { AiOutlineLike } from 'react-icons/ai';
import { RiPlayListAddFill } from 'react-icons/ri';
import { Loader, SideDrawer, Text, Card } from 'components';
import CardPlayer from 'components/CardPlayer/CardPlayer';
import { FETCH_VIDEO_BY_ID, FETCH_VIDEOS } from 'constants/queries/queries';
import { useLocation } from 'react-router-dom';
import './Video.css';

const Video = () => {
  const {
    state: { id = null },
  } = useLocation();

  const { data, loading } = useQuery(FETCH_VIDEO_BY_ID, {
    variables: {
      videoId: Number(id),
    },
  });

  const { data: videoData } = useQuery(FETCH_VIDEOS);

  return (
    <section className="Video__root">
      {loading && <Loader />}
      <SideDrawer />
      <article className="Video__wrapper">
        {data?.video && (
          <div className="Video__container">
            <CardPlayer url={data.video.url} />
            <div className="px-2 mt-2 mb-1">
              <div className="d-flex content-between">
                <div className="w-20 d-flex items-end mb-1">
                  <AiOutlineLike size="2rem" cursor="pointer" />
                  <span className="text-12">LIKE</span>
                </div>
                <div>
                  <RiPlayListAddFill size="1.5rem" cursor="pointer" />
                </div>
              </div>

              <Text size="sm" align="start" className="max-w-50 h-full Text--ellipsis">
                {data.video.description}
              </Text>
            </div>
          </div>
        )}
        <div className="Video__watchContainer">
          <Text size="md" className="text-bold mb-1">
            Watch More
          </Text>
          <div>
            {videoData?.videos &&
              videoData.videos
                .slice(4, 12)
                .map((video) => <Card className="Card__width" key={video.id} item={video} />)}
          </div>
        </div>
      </article>
    </section>
  );
};

export default Video;
