import { useQuery } from '@apollo/client';
import Button from 'components/Button/Button';
import { FETCH_CATEGORY } from 'constants/queries/queries';
import './Categorybar.css';

const Categorybar = () => {
  const { data } = useQuery(FETCH_CATEGORY);

  return (
    <header className="Categorybar__root">
      <div className="d-flex content-start">
        {data?.categories?.map((category) => (
          <div key={category.id} className="Categorybar__link">
            <Button
              component="navLink"
              className="radius-inherit"
              to="/"
              activeClassName="link-active"
            >
              {category.name}
            </Button>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Categorybar;
