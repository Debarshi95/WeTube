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

const GUEST_EMAIL = process.env.REACT_APP_GUEST_EMAIL;
const GUEST_PASSWORD = process.env.REACT_APP_GUEST_PASSWORD;

const SignIn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { setUser } = useAuthContext();

  const [login] = useMutation(LOGIN_USER, LOGIN_USER_MUTATION_OPTIONS);

  const handleSubmit = async (values, { resetForm }) => {
    const pathname = state?.pathname || '/';
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
        navigate(pathname, { replace: true, state: { id: state?.id } });
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
    <div className="SignIn__formContainer">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validateLogin()}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit: handleFormikSubmit,
          isSubmitting,
          values,
          errors,
          touched,
          setValues,
        }) => {
          return (
            <>
              <Text variant="h5" className="Text--primary mt-1 mb-2" align="center" size="md">
                Sign in to continue
              </Text>
              {errors?.message && (
                <Text variant="p" className="Text--error mb-2" align="center" size="sm">
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
                <div>
                  <Button
                    component="button"
                    type="submit"
                    variant="contained"
                    className="text-bold w-full mt-2/5"
                    disabled={Boolean(
                      isSubmitting || !touched || values.email === '' || values.password === ''
                    )}
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign In'}
                  </Button>
                  <Button
                    component="button"
                    type="click"
                    variant="outlined"
                    className="text-bold w-full my-2/3"
                    disabled={isSubmitting}
                    onClick={() => {
                      setValues({
                        email: GUEST_EMAIL,
                        password: GUEST_PASSWORD,
                      });
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign in as Guest user'}
                  </Button>
                </div>
                <Text className="my-2/3">
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
  );
};

export default SignIn;
