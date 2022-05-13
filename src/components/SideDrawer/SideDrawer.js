import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AiOutlineCompass } from 'react-icons/ai';
import { MdOutlineClear, MdOutlineWatchLater, MdHistory } from 'react-icons/md';
import { RiPlayListFill } from 'react-icons/ri';
import { useSideDrawerContext } from 'providers';
import { Text } from 'components';
import './SideDrawer.css';

const links = [
  {
    name: 'Home',
    icon: <AiOutlineCompass size="1.5rem" color="inherit" />,
    pathname: '/',
  },
  {
    name: 'Watch Later',
    icon: <MdOutlineWatchLater size="1.5rem" color="inherit" />,
    pathname: '/watchlater',
  },
  {
    name: 'History',
    icon: <MdHistory size="1.5rem" color="inherit" />,
    pathname: '/history',
  },
  {
    name: 'Playlist',
    icon: <RiPlayListFill size="1.5rem" color="inherit" />,
    pathname: '/playlist',
  },
];

const SideDrawer = () => {
  const { open, toggle } = useSideDrawerContext();

  return (
    <div className={cn('SideDrawer__root', { 'slide-in': open, 'slide-out': !open })}>
      <nav>
        <Link to="/" className=" mt-1 mb-2 d-block">
          <div className="d-flex  content-between">
            <Text size="md" className="Text--red text-bold">
              WeTube
            </Text>
            <div role="button" aria-hidden className="Text--red d-flex" onClick={toggle}>
              <MdOutlineClear size="1.5rem" color="inherit" />
            </div>
          </div>
        </Link>
        {links.map((link, idx) => (
          <Link to={link.pathname} key={idx} className="SideDrawer__links">
            <div className="d-flex">
              <Text variant="div" size="xs" className="mr-1">
                {link.icon}
              </Text>
              <Text>{link.name}</Text>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideDrawer;
