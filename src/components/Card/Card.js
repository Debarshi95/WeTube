import cn from 'classnames';
import kebabCase from 'lodash/kebabCase';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { toCamelCase } from 'utils/helperFuncs';
import './Card.css';

const Card = ({ item: video, className, children, ...props }) => {
  const videoName = kebabCase(toCamelCase(video.title));

  return (
    <Link to={`/video/${videoName}`} state={{ id: video.id }}>
      <div className={cn('Card__root', className)} {...props}>
        {children}
      </div>
    </Link>
  );
};

Card.defaultProps = {
  className: '',
};
export default memo(Card);
