import { Form, Formik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Text, Input } from 'components';
import { validateLogin } from 'utils/validators';
import { LOGIN_USER } from 'constants/queries/queries';
import { formatErrorMsg, setLocalStorageData } from 'utils/helperFuncs';
import { useAuthContext } from 'providers';
import './SignIn.css';

const LOGIN_USER_MUTATION_OPTIONS = {
  onCompleted: (data) => {
    const { loginUser } = data || {};
    if (loginUser?.token) {
      setLocalStorageData('token', loginUser.token, true);
    }
  },
};

const SignIn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { setUser } = useAuthContext();

  const [login] = useMutation(LOGIN_USER, LOGIN_USER_MUTATION_OPTIONS);

  const handleSubmit = async (values, { resetForm }) => {
    const pathname = state?.location?.from?.pathname || '/';
    let message;
    const { email, password } = values;
    try {
      const res = await login({
        variables: {
          email,
          password,
        },
      });

      if (res?.data) {
        setUser(res.data.loginUser);
        navigate(pathname, { replace: true });
      }
      if (res?.errors) {
        message = formatErrorMsg(res?.errors);
      }
    } catch (error) {
      message = error?.message;
    }
    resetForm({
      values: { ...values, password: '' },
      errors: { message },
      touched: {
        password: true,
      },
    });
  };

  return (
    <div className="SignIn__root">
      <Text variant="h5" className="Text--primary mt-1 mb-2" align="center" size="md">
        Sign in to continue
      </Text>
      <div className="SignIn__formContainer">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validateLogin()}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit: handleFormikSubmit, isSubmitting, values, errors, touched }) => {
            return (
              <>
                {errors?.message && (
                  <Text variant="p" className="Text--error mb-2" align="center" size="xs">
                    {errors.message || 'Oops! Some error occurred'}
                  </Text>
                )}
                <Form autoComplete="off" onSubmit={handleFormikSubmit}>
                  <Input name="email" type="email" placeholder="Email" value={values.email} />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                  />
                  <Button
                    component="button"
                    type="submit"
                    variant="contained"
                    className="SignIn__button text-bold w-10 Text--xs"
                    disabled={Boolean(
                      isSubmitting || !touched || values.email === '' || values.password === ''
                    )}
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign In'}
                  </Button>
                  <Text className="my-1">
                    Not registered?
                    <Link to="/signup" className="Text--primary text-12 ml-half">
                      Sign up
                    </Link>
                  </Text>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
