import ReactModal from 'react-modal';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { MdClear } from 'react-icons/md';
import { Text, Button } from 'components';
import { useAuthContext } from 'providers';
import {
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  FETCH_USER_PLAYLIST,
  UPDATE_PLAYLIST,
} from 'constants/queries/queries';
import './Modal.css';

ReactModal.setAppElement(document.querySelector('body'));

const Modal = ({ onClose, isOpen, videoId }) => {
  const inputRef = useRef();
  const { user } = useAuthContext();

  const { data: playlistData, refetch: refectPlaylist } = useQuery(FETCH_USER_PLAYLIST);

  const [createPlaylist] = useMutation(CREATE_PLAYLIST);

  const [updatePlaylist] = useMutation(UPDATE_PLAYLIST);

  const [deletePlaylist] = useMutation(DELETE_PLAYLIST);

  const handleCreatePlaylist = async () => {
    if (!user.id) return;

    try {
      const res = await createPlaylist({
        variables: {
          name: inputRef.current.value,
          videoId,
        },
      });

      const { success = false, message = 'Some error occurred' } = res.data?.createPlaylist || {};
      if (success) {
        inputRef.current.value = '';
        refectPlaylist();
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || '');
    }
  };

  const handleUpdatePlaylist = async (e, playlistId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await updatePlaylist({
        variables: {
          videoId,
          playlistId,
        },
      });
      const { success = false, message = 'Some error occurred' } = res.data?.updatePlaylist || {};
      if (success) {
        refectPlaylist();
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || '');
    }
  };

  const handleDeletePlaylist = async (e, playlistId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const type = 'ALL';
      const res = await deletePlaylist({
        variables: {
          playlistId,
          type,
        },
      });
      const { success = false, message = 'Some error occurred' } = res.data?.deletePlaylist || {};
      if (success) {
        refectPlaylist();
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || '');
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      portalClassName="Modal__root"
      style={{
        content: {
          background: 'transparent',
          border: 0,
          padding: '1rem',
          inset: '5.5rem 0',
          height: '80%',
        },
        overlay: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <div className="Modal__form">
        <input type="text" placeholder="Enter playlist name" ref={inputRef} />
        <Button className="w-full d-flex flex-col text-bold" onClick={handleCreatePlaylist}>
          Create new Playlist
        </Button>
        <div>
          <Text className="my-1">Your Playlists</Text>
          {playlistData?.playlist.map((playlist) => (
            <div
              key={playlist.id}
              role="button"
              aria-hidden
              className="Modal__playlistname"
              onClick={(e) => handleUpdatePlaylist(e, playlist.id)}
            >
              <Text size="xs">{playlist.name}</Text>
              <div
                role="button"
                aria-hidden
                className="p-icon"
                onClick={(e) => handleDeletePlaylist(e, playlist.id)}
              >
                <MdClear cursor="pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
