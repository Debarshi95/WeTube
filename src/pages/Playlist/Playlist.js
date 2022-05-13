import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { MdDeleteOutline } from 'react-icons/md';
import { Button, VideoPlayer, Loader, Text, PlayerCard } from 'components';
import { DELETE_PLAYLIST, FETCH_USER_PLAYLIST } from 'constants/queries/queries';
import { useAuthContext } from 'providers';
import './Playlist.css';

const Playlist = () => {
  const { user } = useAuthContext();

  const { data, loading, refetch } = useQuery(FETCH_USER_PLAYLIST, {
    fetchPolicy: 'network-only',
  });

  const [deletePlaylist] = useMutation(DELETE_PLAYLIST);

  if (loading) return <Loader />;

  if (!user?.id) {
    return (
      <section className="h-80 d-flex content-center items-center">
        <Text size="md">You must be logged in to check playlist</Text>
      </section>
    );
  }

  const handleDeletePlaylist = async ({ playlistId, video = null, type = '' }) => {
    const length = data.playlist.find((playlist) => playlist.id === playlistId)?.videos?.length;
    let deleteAll = type;

    if (length <= 1) {
      deleteAll = 'ALL';
    }

    try {
      const res = await deletePlaylist({
        variables: {
          playlistId,
          videoId: video?.id,
          type: deleteAll,
        },
      });
      const { success } = res.data?.deletePlaylist || {};
      if (success) {
        refetch();
      }
    } catch (error) {
      toast.error('Some error occurred');
    }
  };

  return (
    <section className="Playlist__root">
      {data?.playlist?.length ? (
        data.playlist.map((playlist) => (
          <div key={playlist.id} className="Playlist__wrapper">
            <header className="d-flex content-between items-center mb-1 text-bold">
              <Text size="md">{playlist.name}</Text>
              <Button
                className="text-bold"
                onClick={() => handleDeletePlaylist({ playlistId: playlist.id, type: 'ALL' })}
              >
                Delete Playlist
              </Button>
            </header>
            <div className="Playlist__cardContainer">
              {playlist.videos.map((video) => (
                <PlayerCard
                  video={video}
                  key={video.id}
                  refetchVideos={refetch}
                  className="Playlist__card"
                  cardActionProps={{
                    icon: <MdDeleteOutline cursor="pointer" size="1.5rem" />,
                    onClick: (args) => handleDeletePlaylist({ playlistId: playlist.id, ...args }),
                  }}
                  ellipsisText
                >
                  <VideoPlayer url={video.url} className="Playlist__player" />
                </PlayerCard>
              ))}
            </div>
          </div>
        ))
      ) : (
        <Text size="md" className="my-6">
          No playlist found. Try creating a Playlist
        </Text>
      )}
    </section>
  );
};

export default Playlist;
