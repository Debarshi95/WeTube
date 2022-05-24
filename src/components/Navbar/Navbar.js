import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuthContext, useSideDrawerContext } from 'providers';
import { Button } from 'components';
import { LOGOUT_USER } from 'constants/queries/queries';
import { deleteLocalStorageData } from 'utils/helperFuncs';
import './Navbar.css';

const MENUBAR_LINKS = ['/', '/watchlater', '/category/*', '/playlist', '/history'];

const Navbar = () => {
  const { user = null, setUser } = useAuthContext();
  const { toggle } = useSideDrawerContext();

  const location = useLocation();

  const showMenuBar = MENUBAR_LINKS.includes(location.pathname);

  const [logout] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      deleteLocalStorageData('token');
      setUser(null);
    },
  });

  return (
    <div className="Navbar__root">
      <nav className="d-flex content-between">
        <div className="d-flex items-center">
          <div role="button" aria-hidden onClick={toggle}>
            {showMenuBar && <GiHamburgerMenu className="ham--icon" />}
          </div>
          <Link to="/" className="Navbar__navlink-main">
            WeTube
          </Link>
        </div>
        {user ? (
          <Button variant="outlined" className="Button--hover-white Text--xs" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link
            to="/signin"
            className="Text--white text-bold"
            state={{ pathname: location.pathname, id: location?.state?.id }}
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default memo(Navbar);
