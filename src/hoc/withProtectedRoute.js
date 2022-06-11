import { Loader, Text } from 'components';
import { useAuthContext } from 'providers';

const withProtectedRoute = (Component, text = '') => {
  return (props) => {
    const { user, loading } = useAuthContext();

    if (loading) return <Loader />;

    if (!user?.id) {
      return (
        <section className="h-80 d-flex content-center items-center">
          <Text size="md">{text || 'You must be logged in to check playlist'}</Text>
        </section>
      );
    }
    return <Component user={user} {...props} />;
  };
};

export default withProtectedRoute;
