import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuthContext, useSideDrawerContext } from 'providers';
import { Button } from 'components';
import { LOGOUT_USER } from 'constants/queries/queries';
import { deleteLocalStorageData } from 'utils/helperFuncs';
import './Navbar.css';

const Navbar = () => {
  const { user = null, setUser } = useAuthContext();
  const { toggle } = useSideDrawerContext();

  const [logout] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      deleteLocalStorageData('token');
      setUser(null);
    },
  });

  return (
    <div className="Navbar__root">
      <nav className="d-flex content-between items-center">
        <div className="d-flex items-center">
          <div role="button" aria-hidden onClick={toggle} className="d-flex">
            <GiHamburgerMenu className="ham--icon" />
          </div>
          <Link to="/" className="Navbar--main Text--red py-1 text-bold text-16">
            WeTube
          </Link>
        </div>
        {user ? (
          <Button
            size="md"
            variant="contained"
            className="Button--hover-white text-bold"
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <Link to="/signin" className="Text--white py-1 text-bold">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default memo(Navbar);
