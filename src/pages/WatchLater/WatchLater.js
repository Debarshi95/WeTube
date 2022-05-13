import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MdOutlineWatchLater } from 'react-icons/md';
import { useAuthContext } from 'providers';
import { PlayerCard, Text, VideoPlayer } from 'components';
import { FETCH_WATCH_LATER, UPDATE_WATCH_LATER } from 'constants/queries/queries';
import './WatchLater.css';

const WatchLater = () => {
  const { user } = useAuthContext();

  const [fetchWatches, { data, refetch }] = useLazyQuery(FETCH_WATCH_LATER, {
    fetchPolicy: 'network-only',
  });

  const [updateWatchLater] = useMutation(UPDATE_WATCH_LATER);

  useEffect(() => {
    if (user?.id) {
      fetchWatches();
    }
  }, [fetchWatches, user?.id]);

  const handleWatchLater = async ({ video }) => {
    if (user?.id) {
      const res = await updateWatchLater({
        variables: {
          videoId: video.id,
        },
      });
      const { success, message = '' } = res.data?.updateWatchLater || false;
      if (success) {
        refetch();
        toast.success(message);
      }
      return null;
    }
    return toast.error('You must be logged in');
  };

  if (!user?.id) {
    return (
      <section className="h-80 d-flex content-center items-center">
        <Text size="md">You must be logged in to check watch later data</Text>
      </section>
    );
  }
  return (
    <div className="WatchLater__root">
      <article className="Watch__container">
        {data?.watchs?.length ? (
          data?.watchs?.map((watch) => (
            <PlayerCard
              key={watch.id}
              video={watch.video}
              refetchVideos={refetch}
              className="WatchLater__Card"
              cardActionProps={{
                icon: <MdOutlineWatchLater cursor="pointer" size="1.5rem" />,
                onClick: handleWatchLater,
              }}
            >
              <VideoPlayer url={watch.video.url} />
            </PlayerCard>
          ))
        ) : (
          <Text size="md">No data found. Try adding some videos</Text>
        )}
      </article>
    </div>
  );
};

export default WatchLater;
