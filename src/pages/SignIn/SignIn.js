/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Text, Input } from 'components';
import { validateLogin } from 'utils/validators';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    let message;

    try {
      //
    } catch {
      //
    }
    resetForm({
      values: { ...values, password: '' },
      errors: { message },
      touched: {
        password: true,
      },
    });
    return null;
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
                    Already registered?
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
