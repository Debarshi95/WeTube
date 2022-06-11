import { upperFirst } from 'lodash';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FaUserCircle } from 'react-icons/fa';
import { Card, Text } from 'components';
import { FETCH_VIDEO_BY_CATEGORY } from 'constants/queries/queries';
import './Category.css';

const Category = () => {
  const { pathname } = useLocation();
  const categoryName = pathname.split('/')[2];

  const { data } = useQuery(FETCH_VIDEO_BY_CATEGORY, {
    variables: {
      categoryName: upperFirst(categoryName),
    },
  });

  return (
    <section className="Category__root">
      {data?.videos?.length && (
        <article className="Category__cardContainer">
          {data?.videos?.map((video) => (
            <Card item={video} key={video.id}>
              <Card.Image src={video.thumbnail} alt={video.title} height="13rem" />
              <Card.Content role="button" tabIndex={0} className="Card__content">
                <Text className="Text--ellipsis">{video.title}</Text>
                <div className="d-flex items-center content-between my-1">
                  <Text variant="div" className="d-flex items-center">
                    <FaUserCircle className="Card_icon" />
                    <Text size="xs" className="text-bold">
                      {video?.user?.username}
                    </Text>
                  </Text>
                  <Text size="xs" align="start">
                    <span className="text-bold px-1">Views {video?.views}</span>
                  </Text>
                </div>
              </Card.Content>
            </Card>
          ))}
        </article>
      )}
    </section>
  );
};

export default Category;
