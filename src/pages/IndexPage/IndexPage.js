import { Categorybar, SideDrawer } from 'components';
import { Outlet } from 'react-router-dom';
import './IndexPage.css';

const Home = () => {
  return (
    <section className="Index__root">
      <SideDrawer />

      <Categorybar />
      <Outlet />
    </section>
  );
};

export default Home;
