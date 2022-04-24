import { useQuery } from '@apollo/client';
import Button from 'components/Button/Button';
import { FETCH_CATEGORY } from 'constants/queries/queries';
import { memo } from 'react';
import { toCamelCase } from 'utils/helperFuncs';
import './Categorybar.css';

const Categorybar = () => {
  const { data } = useQuery(FETCH_CATEGORY);

  return (
    <header className="Categorybar__root">
      <div className="d-flex content-start">
        {data?.categories?.map((category) => {
          const pathname = toCamelCase(category.name);
          return (
            <div key={category.id} className="Categorybar__link">
              <Button
                component="navLink"
                className="radius-inherit"
                to={`category/${pathname}`}
                activeClassName="link-active"
              >
                {category.name}
              </Button>
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default memo(Categorybar);
