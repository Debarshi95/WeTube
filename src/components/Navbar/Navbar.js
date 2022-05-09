import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuthContext, useSideDrawerContext } from 'providers';
import { Button } from 'components';
import './Navbar.css';

const Navbar = () => {
  const { user = null } = useAuthContext();
  const { toggle } = useSideDrawerContext();

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
          <Button size="md" variant="contained" className="text-bold">
            Logout
          </Button>
        ) : (
          <Button size="md" variant="contained" className="text-bold">
            Login
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
