import BeatLoader from 'react-spinners/BeatLoader';
import './Loader.css';

const color = '#9b1607c2';

const Loader = () => {
  return (
    <div className="Loader__root">
      <BeatLoader color={color} />
    </div>
  );
};

export default Loader;
