import React from 'react';
import { useAuth } from '../context/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { B2Home } from '../button/B2Home';
import Card from '../UI/Card';

const SignUp: React.FC = () => {
  const { signup } = useAuth(); // Assuming you'll use the same login context for SignUp
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate('/login')
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-white px-4 sm:px-6 lg:px-8">
      <Card title="Sign Up">
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            signup(values.email, values.password);
            navigate('/home');
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-700 focus:outline-none ${
                    touched.email && errors.email ? 'ring-1 ring-red-500' : ''
                  }`}
                  placeholder="Enter your email address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-700 focus:outline-none ${
                    touched.password && errors.password ? 'ring-1 ring-red-500' : ''
                  }`}
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-700 focus:outline-none ${
                    touched.confirmPassword && errors.confirmPassword ? 'ring-1 ring-red-500' : ''
                  }`}
                  placeholder="Confirm your password"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing Up...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
      </Card>

      <div className='mt-4'>
        <span className='font-medium text-gray-400'>Got an account?</span>
        <button onClick={loginHandler} className='font-bold text-black underline ml-1 cursor-pointer hover:text-blue-600'>Sign in</button>
      </div>

      <B2Home/>
    </div>
  );
};

export default SignUp;
