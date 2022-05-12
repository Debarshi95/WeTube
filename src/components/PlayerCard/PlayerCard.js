import cn from 'clsx';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { RiPlayListAddFill, RiThumbUpLine } from 'react-icons/ri';
import { MdOutlineWatchLater } from 'react-icons/md';
import { IoMdThumbsUp } from 'react-icons/io';
import { Text, Modal } from 'components';
import { UPDATE_LIKE, UPDATE_VIEW, UPDATE_WATCH_LATER } from 'constants/queries/queries';
import { isVideoLiked } from 'utils/helperFuncs';
import './PlayerCard.css';
import { useAuthContext } from 'providers';

const PlayerCard = ({
  video,
  className,
  refetchVideos,
  shouldAddToView,
  enableWatchLater,
  enablePlaylist,
  children,
  ellipsisText,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateView] = useMutation(UPDATE_VIEW);

  const [updateLike] = useMutation(UPDATE_LIKE);

  const [updateWatchLater] = useMutation(UPDATE_WATCH_LATER);

  const { user } = useAuthContext();

  const liked = isVideoLiked(video?.likes, user?.id);

  useEffect(() => {
    if (shouldAddToView && user?.id) {
      updateView({
        variables: {
          videoId: video.id,
        },
      });
    }
  }, [shouldAddToView, updateView, user?.id, video.id]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('Modal--open');
    } else {
      document.body.classList.remove('Modal--open');
    }
  }, [isModalOpen]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (user?.id) {
      const res = await updateLike({
        variables: {
          videoId: video?.id || '',
        },
      });
      const { success } = res.data?.updateLike || false;
      if (success) {
        refetchVideos();
      }
      return null;
    }

    return toast.error('You must be logged in to like a video');
  };

  const handleModalClick = (e, value) => {
    e.stopPropagation();
    setIsModalOpen(value);
  };

  const handleWatchLater = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (user?.id) {
      const res = await updateWatchLater({
        variables: {
          videoId: video?.id || '',
        },
      });
      const { success, message = '' } = res.data?.updateWatchLater || false;
      if (success) {
        toast.success(message);
      }
      return null;
    }

    return toast.error('You must be logged in to like a video');
  };

  return (
    <section className={cn('PlayerCard__root', className)}>
      {children}
      <div className="PlayerCard__contentWrapper">
        <div className="d-flex content-between">
          <div className="w-20 d-flex items-end mb-1">
            {liked ? (
              <IoMdThumbsUp size="1.6rem" cursor="pointer" onClick={handleLike} />
            ) : (
              <RiThumbUpLine size="1.6rem" cursor="pointer" onClick={handleLike} />
            )}
            <span className="text-10 d-block ml-half">{liked?.user?.id ? 'Unlike' : 'Like'}</span>
          </div>

          <div className="d-flex items-center">
            {enablePlaylist && (
              <div
                className="p-icon"
                role="button"
                aria-hidden
                onClick={(e) => handleModalClick(e, true)}
              >
                <RiPlayListAddFill size="1.5rem" cursor="pointer" />
              </div>
            )}

            <div className="p-icon">
              {enableWatchLater && (
                <MdOutlineWatchLater size="1.6rem" cursor="pointer" onClick={handleWatchLater} />
              )}
            </div>
          </div>
        </div>

        <Text
          size="sm"
          align="start"
          className={cn('pb-2 w-full h-full', {
            'Text--ellipsis': ellipsisText,
          })}
        >
          {video?.description}
        </Text>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={(e) => handleModalClick(e, false)}
          videoId={video.id}
        />
      )}
    </section>
  );
};

PlayerCard.defaultProps = {
  refetchVideos: () => null,
  shouldAddToView: false,
  enableWatchLater: false,
  enablePlaylist: false,
  cardPlayerClassName: '',
  ellipsisText: false,
};

export default PlayerCard;
