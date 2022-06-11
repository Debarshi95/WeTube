import toast from 'react-hot-toast';
import { useQuery, useMutation } from '@apollo/client';
import { MdOutlineWatchLater } from 'react-icons/md';
import { Loader, PlayerCard, Text } from 'components';
import { FETCH_WATCH_LATER, UPDATE_WATCH_LATER } from 'constants/queries/queries';
import withProtectedRoute from 'hoc/withProtectedRoute';
import './WatchLater.css';

const WatchLater = ({ user }) => {
  const { data, refetch, loading } = useQuery(FETCH_WATCH_LATER, {
    fetchPolicy: 'network-only',
  });

  const [updateWatchLater] = useMutation(UPDATE_WATCH_LATER);

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

  if (loading) return <Loader />;
  return (
    <div className="WatchLater__root">
      <article className="Watch__container">
        {data?.watchs?.length ? (
          data?.watchs?.map((watch, idx) => (
            <PlayerCard
              key={watch.id || idx}
              video={watch.video}
              refetchVideos={refetch}
              className="WatchLater__Card"
              cardActionProps={[
                {
                  icon: <MdOutlineWatchLater cursor="pointer" size="1.5rem" />,
                  onClick: handleWatchLater,
                },
              ]}
            >
              <PlayerCard.Video url={watch.video.url} />
            </PlayerCard>
          ))
        ) : (
          <Text size="md">No data found. Try adding some videos</Text>
        )}
      </article>
    </div>
  );
};

export default withProtectedRoute(WatchLater);
