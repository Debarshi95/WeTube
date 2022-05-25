import Tooltip from 'react-tooltip';
import cn from 'classnames';
import kebabCase from 'lodash/kebabCase';
import { memo } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Image, Text } from 'components';
import { Link } from 'react-router-dom';
import { toCamelCase } from 'utils/helperFuncs';
import './Card.css';

const Card = ({
  item: video,
  className,
  showDeleteIcon,
  cardContentClassName,
  imgProps,
  cardContentProps,
  onDelete,
  ...props
}) => {
  const videoName = kebabCase(toCamelCase(video.title));

  return (
    <Link to={`/video/${videoName}`} state={{ id: video.id }}>
      <div className={cn('Card__root', className)} {...props}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={imgProps.width}
          height={imgProps.height}
        />

        <div
          role="button"
          tabIndex={0}
          className={cn('Card__content', { cardContentClassName })}
          {...cardContentProps}
        >
          <div className="d-flex content-between">
            <Text className="Text--ellipsis">{video.title}</Text>
            {showDeleteIcon && (
              <div
                role="button"
                data-tip
                data-for="delete"
                aria-hidden
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(video);
                }}
              >
                <MdDelete className="Card_icon-delete" />
                <Tooltip place="bottom" id="delete">
                  Delete
                </Tooltip>
              </div>
            )}
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
        </div>
      </div>
    </Link>
  );
};

Card.defaultProps = {
  className: '',
  cardContentClassName: '',
  cardContentProps: {},
  showDeleteIcon: false,
  onDelete: () => null,
  imgProps: {
    width: '100%',
    height: '13rem',
  },
};
export default memo(Card);
