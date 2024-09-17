import React from 'react';
import { useAuth } from '../context/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { B2Home } from '../button/B2Home';
import Card from '../UI/Card';

const Login: React.FC = () => {
  const { login } = useAuth(); // Auth hook
  const navigate = useNavigate(); // navigation hook

  // Custom validation function
  // const validate = (values: { email: string; password: string }) => {
  //   const errors: { email?: string; password?: string } = {};

  //   if (!values.email) {
  //     errors.email = 'Email is required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if (!values.password) {
  //     errors.password = 'Password is required';
  //   }

  //   return errors;
  // };


  const signUpHandler = () => {
    navigate('/register')
  }

   const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  });

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-white px-4 sm:px-6 lg:px-8">
      <Card title="Login to your account">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            login(values.email, values.password);
            navigate('/home'); // Redirect to Home page after login
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className={`w-full px-3 py-2 border text-sm md:text-base rounded-lg text-gray-700 focus:outline-none  ${
                    touched.email && errors.email ? 'ring-1 ring-red-500' : 'focus:ring-1 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className={`w-full px-3 py-2 border text-sm md:text-base rounded-lg text-gray-700 focus:outline-none  ${
                    touched.password && errors.password ? 'ring-1 ring-red-500' : 'focus:ring-1 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your password (min. of 8 characters)"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <span className="text-blue-500 text-sm underline cursor-pointer hover:text-blue-600">Forgot password</span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </Card>

      <div className='mt-4'>
        <span className='font-medium text-gray-400'>Are you a new user?</span>
        <button onClick={signUpHandler} className='font-bold text-black underline ml-1 cursor-pointer hover:text-blue-600'>Create an account</button>
      </div>

     <B2Home/>
    </div>
  );
};

export default Login;


