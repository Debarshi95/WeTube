import toast from 'react-hot-toast';
import Tooltip from 'react-tooltip';
import { useCallback } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Loader, Text, Card } from 'components';
import { DELETE_PLAYLIST, FETCH_USER_PLAYLIST } from 'constants/queries/queries';
import withProtectedRoute from 'hoc/withProtectedRoute';
import './Playlist.css';

const Playlist = () => {
  const { data, loading, refetch } = useQuery(FETCH_USER_PLAYLIST, {
    fetchPolicy: 'network-only',
  });

  const [deletePlaylist] = useMutation(DELETE_PLAYLIST);

  const handleDeletePlaylist = useCallback(
    async ({ playlistId, video = null, type = '' }) => {
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
    },
    [data?.playlist, deletePlaylist, refetch]
  );

  const renderPlaylistCard = useCallback(
    (playlist, video) => (
      <Card item={video} key={video.id} className="Playlist__card">
        <Card.Image src={video.thumbnail} alt={video.title} height="13rem" />
        <Card.Content role="button" tabIndex={0} className="Card__content">
          <div className="d-flex content-between">
            <Text className="Text--ellipsis">{video.title}</Text>
            <div
              role="button"
              data-tip
              data-for="delete"
              aria-hidden
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeletePlaylist({ playlistId: playlist.id, video });
              }}
            >
              <MdDelete className="Card_icon-delete" />
              <Tooltip place="bottom" id="delete">
                Delete
              </Tooltip>
            </div>
          </div>

          <div className="d-flex items-center content-between my-1">
            <Text variant="div" className="d-flex items-center">
              <FaUserCircle className="Card_icon" />
              <Text size="xs" className="text-bold">
                {video?.user?.username}
              </Text>
            </Text>
            <Text size="xs" align="start">
              <span className="text-bold px-1">Views {video?.views}</span>
            </Text>
          </div>
        </Card.Content>
      </Card>
    ),
    [handleDeletePlaylist]
  );

  if (loading) return <Loader />;

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
              {playlist.videos.map((video) => renderPlaylistCard(playlist, video))}
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

export default withProtectedRoute(Playlist);
