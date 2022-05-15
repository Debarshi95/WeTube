import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { formatErrorMsg, setLocalStorageData } from 'utils/helperFuncs';
import { Button, Text, Input } from 'components';
import { validateRegister } from 'utils/validators';
import { REGISTER_USER_MUTATION } from 'constants/queries/queries';
import './Signup.css';
import { useAuthContext } from 'providers';

const REGISTER_USER_MUTATION_OPTIONS = {
  onCompleted: (data) => {
    const { registerUser } = data || {};
    if (registerUser?.token) {
      setLocalStorageData('token', registerUser.token, true);
    }
  },
};

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const [register] = useMutation(REGISTER_USER_MUTATION, REGISTER_USER_MUTATION_OPTIONS);

  const handleSubmit = async (values, { resetForm }) => {
    let message;
    const { username, email, password, confirmPassword } = values;
    try {
      const res = await register({
        variables: {
          username,
          email,
          password,
          confirmPassword,
        },
      });

      if (res?.data) {
        setUser(res.data.registerUser);
        navigate('/', { replace: true });
      }
      if (res?.errors) {
        message = formatErrorMsg(res?.errors);
      }
    } catch (error) {
      message = error?.message;
    }
    resetForm({
      values: { ...values, password: '', confirmPassword: '' },
      errors: { message },
      touched: {
        password: true,
        confirmPassword: true,
      },
    });
    return null;
  };

  return (
    <div className="Signup__root">
      <Text variant="h5" className="Text--primary mt-1" align="center" size="md">
        Sign up to get started
      </Text>
      <div className="Signup__formContainer">
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validateRegister()}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit: handleFormikSubmit, isSubmitting, values, errors, touched }) => {
            return (
              <>
                {errors?.message && (
                  <Text variant="p" className="Text--error mb-2 px-1" align="center" size="sm">
                    {errors.message || 'Oops! Some error occurred'}
                  </Text>
                )}
                <Form autoComplete="off" onSubmit={handleFormikSubmit}>
                  <Input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={values.username}
                  />
                  <Input name="email" type="email" placeholder="Email" value={values.email} />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                  />
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                  />
                  <Button
                    component="button"
                    type="submit"
                    variant="contained"
                    className="Signup__button text-bold w-10 Text--xs"
                    disabled={Boolean(
                      isSubmitting || !touched || values.email === '' || values.password === ''
                    )}
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                  </Button>
                  <Text className="my-1">
                    Already registered?
                    <Link to="/signin" className="Text--primary text-12 ml-half">
                      Signin
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

export default Signup;
