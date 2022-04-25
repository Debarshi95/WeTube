import ReactPlayer from 'react-player/lazy';
import './CardPlayer.css';

const CardPlayer = ({ url }) => {
  return (
    <div className="CardPlayer__root">
      <ReactPlayer controls url={url} width="100%" height="100%" />
    </div>
  );
};

CardPlayer.defaultProps = {
  width: '100%',
  height: '80%',
};

export default CardPlayer;
