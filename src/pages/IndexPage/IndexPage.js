import { Categorybar, SideDrawer } from 'components';
import { Outlet, useLocation } from 'react-router-dom';
import './IndexPage.css';

const TOPBAR_LINKS = [
  '/',
  '/category/science',
  '/category/technology',
  '/category/sports',
  '/category/movies',
  '/category/trending',
];

const Index = () => {
  const location = useLocation();
  const showTopbar = TOPBAR_LINKS.includes(location.pathname);
  return (
    <section className="Index__root">
      <SideDrawer />
      {showTopbar && <Categorybar />}
      <Outlet />
    </section>
  );
};

export default Index;
