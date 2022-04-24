import Text from 'components/Text/Text';
import cn from 'classnames';
import { useSideDrawerContext } from 'providers';
import { AiOutlineCompass, AiOutlineHome } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

const links = [
  {
    name: 'Home',
    icon: <AiOutlineCompass size="1.75rem" color="inherit" />,
    pathname: '/',
  },
  {
    name: 'Explore',
    icon: <AiOutlineHome size="1.75rem" color="inherit" />,
    pathname: '/explore',
  },
];

const SideDrawer = () => {
  const { open, toggle } = useSideDrawerContext();
  return (
    <div className={cn('SideDrawer__root', { 'slide-in': open, 'slide-out': !open })}>
      <nav>
        <Link to="/" className=" mt-1 mb-2 d-block">
          <div className="d-flex items-center content-between">
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
            <div className="d-flex items-center">
              <Text variant="p" size="xs" className="mr-1">
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
