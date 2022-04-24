import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Navbar.css';
import { useSideDrawerContext } from 'providers';

const Navbar = () => {
  const user = true;
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
          <div className="text-bold text-10">
            <Link to="/history">History</Link>
            <Link to="/watchlist" className="ml-auto">
              Watch Later
            </Link>
          </div>
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