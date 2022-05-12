import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { VideoPlayer, Text, PlayerCard, Button } from 'components';
import { DELETE_HISTORY, FETCH_ALL_VIEWS } from 'constants/queries/queries';
import { useAuthContext } from 'providers';
import './History.css';

const History = () => {
  const { user } = useAuthContext();

  const [fetchViews, { data, refetch }] = useLazyQuery(FETCH_ALL_VIEWS);

  const [deleteViews] = useMutation(DELETE_HISTORY);

  useEffect(() => {
    if (user?.id) {
      fetchViews();
    }
  }, [fetchViews, user?.id]);

  if (!user?.id) {
    return (
      <section className="h-80 d-flex content-center items-center">
        <Text size="md">You must be logged in to check watch history</Text>
      </section>
    );
  }

  const handleDeleteView = async ({ viewId = null, type = '' }) => {
    let res;
    try {
      if (type === 'ALL') {
        res = await deleteViews();
      } else {
        res = await deleteViews({
          variables: {
            viewId,
          },
        });
      }
      const { success } = res?.data?.deleteView || {};
      if (success) {
        refetch();
      }
    } catch (error) {
      toast.error("Couldn't delete view. Some error occurred");
    }
  };

  return (
    <div className="History__root">
      <Button className="ml-auto mb-1">Clear History</Button>
      <article className="History__container">
        {data?.views?.map((view) => (
          <PlayerCard
            video={view.video}
            user={user}
            key={view.id}
            refetchVideos={refetch}
            enableWatchLater
            className="History__Card"
            onViewDelete={handleDeleteView}
          >
            <VideoPlayer url={view.video.url} />
          </PlayerCard>
        ))}
      </article>
    </div>
  );
};

export default History;
