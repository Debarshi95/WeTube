import { memo } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'components/Image/Image';
import Text from 'components/Text/Text';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ item, className, cardContentClassName, cardContentProps, ...props }) => {
  return (
    <Link to={`/video/${item.id}`}>
      <div className={cn('Card__root', { className })} {...props}>
        <Image src={item.imageUrl} alt={item.title} width="100%" height="13rem" />
        <div className={cn('Card__content', { cardContentClassName })} {...cardContentProps}>
          <Text className="mt-1">{item.title}</Text>
          <div className="d-flex items-center content-between my-1">
            <Text variant="div" className="d-flex items-center">
              <FaUserCircle className="Card_icon" />
              <Text size="xs" className="text-bold">
                {item?.uploadedBy?.username}
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
};
export default memo(Card);
