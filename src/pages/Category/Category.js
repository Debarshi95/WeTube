import { upperFirst } from 'lodash';
import { useQuery } from '@apollo/client';
import { Card, Loader } from 'components';
import { FETCH_VIDEO_BY_CATEGORY } from 'constants/queries/queries';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Category = () => {
  const { pathname } = useLocation();
  const categoryName = pathname.split('/')[2];

  const { data, loading } = useQuery(FETCH_VIDEO_BY_CATEGORY, {
    variables: {
      categoryName: upperFirst(categoryName),
    },
  });

  return (
    <section className="Home__root">
      {!loading ? (
        <article className="Home__cardContainer">
          {data?.videos?.map((video) => (
            <Card item={video} key={video.id} />
          ))}
        </article>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Category;
