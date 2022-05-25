import Tooltip from 'react-tooltip';
import cn from 'clsx';
import kebabCase from 'lodash/kebabCase';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { RiThumbUpLine } from 'react-icons/ri';
import { IoMdThumbsUp } from 'react-icons/io';
import { Text } from 'components';
import { useAuthContext } from 'providers';
import { UPDATE_LIKE } from 'constants/queries/queries';
import { isVideoLiked } from 'utils/helperFuncs';
import './PlayerCard.css';

const PlayerCard = ({
  video,
  className,
  refetchVideos,
  cardActionProps,
  children,
  ellipsisText,
}) => {
  const { user } = useAuthContext();

  const [updateLike] = useMutation(UPDATE_LIKE);

  const liked = isVideoLiked(video?.likes, user?.id);

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

  return (
    <section className={cn('PlayerCard__root', className)}>
      {children}
      <div className="PlayerCard__contentWrapper">
        <div className="d-flex content-between">
          <div
            role="button"
            aria-hidden
            className="w-20 d-flex items-end mb-1"
            onClick={handleLike}
          >
            {liked ? (
              <IoMdThumbsUp size="1.6rem" cursor="pointer" />
            ) : (
              <RiThumbUpLine size="1.6rem" cursor="pointer" />
            )}
            <span className="text-10 d-block ml-half">{liked?.user?.id ? 'Unlike' : 'Like'}</span>
          </div>

          <div className="d-flex items-center">
            {cardActionProps && Array.isArray(cardActionProps) ? (
              cardActionProps.map((prop, idx) => (
                <div
                  key={idx}
                  className="p-icon"
                  role="button"
                  aria-hidden
                  data-tip
                  data-for={kebabCase(prop?.tooltipText || '')}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prop?.onClick({ user, video });
                  }}
                >
                  {prop?.icon}
                  <Tooltip place="bottom" id={kebabCase(prop?.tooltipText || '')}>
                    {prop?.tooltipText || ''}
                  </Tooltip>
                </div>
              ))
            ) : (
              <div
                className="p-icon"
                role="button"
                aria-hidden
                data-tip
                data-for={kebabCase(cardActionProps?.tooltipText || '')}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  cardActionProps?.onClick({ user, video });
                }}
              >
                {cardActionProps?.icon}
                <Tooltip place="bottom" id={kebabCase(cardActionProps?.tooltipText || '')}>
                  {cardActionProps?.tooltipText || ''}
                </Tooltip>
              </div>
            )}
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
    </section>
  );
};

PlayerCard.defaultProps = {
  refetchVideos: () => null,
  cardPlayerClassName: '',
  ellipsisText: false,
};

export default PlayerCard;
