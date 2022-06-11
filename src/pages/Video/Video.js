import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import { MdOutlineWatchLater, MdWatchLater } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { RiPlayListAddFill } from 'react-icons/ri';
import { useAuthContext } from 'providers';
import { Loader, Text, Card, PlayerCard, Modal } from 'components';
import { addedToWatchLater } from 'utils/helperFuncs';
import {
  FETCH_VIDEO_BY_ID,
  FETCH_VIDEOS,
  UPDATE_WATCH_LATER,
  UPDATE_VIEW,
} from 'constants/queries/queries';
import './Video.css';

const Video = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { state } = useLocation();

  const { user } = useAuthContext();

  const { data, loading, refetch } = useQuery(FETCH_VIDEO_BY_ID, {
    variables: {
      videoId: state?.id || '',
    },
  });

  const [updateWatchLater] = useMutation(UPDATE_WATCH_LATER);

  const [updateView] = useMutation(UPDATE_VIEW);

  const { data: videoData } = useQuery(FETCH_VIDEOS);

  const md = useMediaQuery({ minWidth: 768 });

  const isAddedToWatchLater = addedToWatchLater(data?.video?.watchLater, user?.id);

  useEffect(() => {
    if (user?.id && data?.video) {
      updateView({
        variables: {
          videoId: state?.id || '',
        },
      });
    }
  }, [data?.video, state?.id, updateView, user?.id]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('Modal--open');
    } else {
      document.body.classList.remove('Modal--open');
    }
  }, [isModalOpen]);

  const handleWatchLater = async ({ video }) => {
    if (user?.id) {
      const res = await updateWatchLater({
        variables: {
          videoId: video?.id || '',
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

  const handleModalClick = (value) => {
    if (!user?.id) return;
    setIsModalOpen(value);
  };

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
            cardActionProps={[
              {
                icon: isAddedToWatchLater ? (
                  <MdWatchLater cursor="pointer" size="1.5rem" />
                ) : (
                  <MdOutlineWatchLater cursor="pointer" size="1.5rem" />
                ),
                onClick: handleWatchLater,
                tooltipText: isAddedToWatchLater ? 'Remove from WatchLater' : 'Add to WatchLater',
              },
              {
                icon: <RiPlayListAddFill cursor="pointer" size="1.5rem" />,
                onClick: () => handleModalClick(true),
                tooltipText: 'Add to Playlist',
              },
            ]}
          >
            <PlayerCard.Video url={data.video.url} className="Video__playerCard" />
          </PlayerCard>
        )}
      </article>
      <div className="Video__watchContainer">
        <Text size="md" className="text-bold mb-1">
          Watch More
        </Text>

        {videoData?.videos?.slice(8, 16).map((video) => (
          <Card className="Video__watchCard" key={video.id} item={video}>
            <Card.Image src={video.thumbnail} alt={video.title} height={md ? '16rem' : '14rem'} />
            <Text className="Text--ellipsis">{video.title}</Text>
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
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={(e) => {
          e.stopPropagation();
          handleModalClick(false);
        }}
        videoId={data?.video.id}
      />
    </section>
  );
};

export default Video;
