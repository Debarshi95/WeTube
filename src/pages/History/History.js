import toast from 'react-hot-toast';
import { useQuery, useMutation } from '@apollo/client';
import { MdDeleteOutline } from 'react-icons/md';
import { VideoPlayer, Text, PlayerCard, Button, Loader } from 'components';
import { DELETE_HISTORY, FETCH_ALL_VIEWS } from 'constants/queries/queries';
import { formatErrorMsg } from 'utils/helperFuncs';
import withProtectedRoute from 'hoc/withProtectedRoute';
import './History.css';

const History = ({ user }) => {
  const { data, refetch, loading } = useQuery(FETCH_ALL_VIEWS);

  const [deleteViews] = useMutation(DELETE_HISTORY);

  const handleDeleteView = async ({ viewId = null, type = '' }) => {
    try {
      const res = await deleteViews({
        variables: {
          viewId,
          type,
        },
      });

      const { success } = res?.data?.deleteView || {};
      if (success) {
        refetch();
      }
    } catch (error) {
      const message = formatErrorMsg(error);
      toast.error(message || "Couldn't delete view. Some error occurred");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="History__root">
      {data?.views?.length ? (
        <Button className="ml-auto mb-1" onClick={() => handleDeleteView({ type: 'ALL' })}>
          Clear History
        </Button>
      ) : null}
      <article>
        {data?.views?.length ? (
          data.views.map((view) => (
            <PlayerCard
              video={view.video}
              user={user}
              key={view.id}
              refetchVideos={refetch}
              enableWatchLater
              className="History__Card"
              cardActionProps={{
                icon: <MdDeleteOutline cursor="pointer" size="1.5rem" />,
                onClick: (args) => handleDeleteView({ viewId: view.id, ...args }),
              }}
            >
              <VideoPlayer url={view.video.url} />
            </PlayerCard>
          ))
        ) : (
          <Text size="md" className="my-6">
            No History found. Try Seeing some videos
          </Text>
        )}
      </article>
    </div>
  );
};

export default withProtectedRoute(History);
