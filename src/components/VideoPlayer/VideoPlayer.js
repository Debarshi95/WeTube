import ReactPlayer from 'react-player/lazy';
import cn from 'clsx';
import './VideoPlayer.css';

const VideoPlayer = ({ url, className, width, height }) => {
  return (
    <div className={cn('VideoPlayer__root', className)}>
      <ReactPlayer controls url={url} width={width} height={height} />
    </div>
  );
};

VideoPlayer.defaultProps = {
  width: '100%',
  height: '100%',
};

export default VideoPlayer;
