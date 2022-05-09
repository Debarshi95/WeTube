import cn from 'classnames';
import kebabCase from 'lodash/kebabCase';
import { memo } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Image, Text } from 'components';
import { Link } from 'react-router-dom';
import { toCamelCase } from 'utils/helperFuncs';
import './Card.css';

const Card = ({ item, className, cardContentClassName, imgProps, cardContentProps, ...props }) => {
  const itemName = kebabCase(toCamelCase(item.title));

  return (
    <Link to={`/video/${itemName}`} state={{ id: item.id }}>
      <div className={cn('Card__root', className)} {...props}>
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={imgProps.width}
          height={imgProps.height}
        />
        <div className={cn('Card__content', { cardContentClassName })} {...cardContentProps}>
          <Text className="mt-1">{item.title}</Text>
          <div className="d-flex items-center content-between my-1">
            <Text variant="div" className="d-flex items-center">
              <FaUserCircle className="Card_icon" />
              <Text size="xs" className="text-bold">
                {item?.user?.username}
              </Text>
            </Text>
            <Text size="xs" align="start">
              <span className="text-bold">Views</span> {item.viewCount}
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
  imgProps: {
    width: '100%',
    height: '13rem',
  },
};
export default memo(Card);
