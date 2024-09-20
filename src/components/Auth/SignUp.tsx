import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import { B2Home } from '../button/B2Home';

// Validation schemas for each step
const personalInfoSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  date_of_birth: Yup.string().required('Date of birth is required'),
});

const accountInfoSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const contactInfoSchema = Yup.object({
  address: Yup.string().required('Address is required'),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must be digits')
    .required('Phone number is required'),
});

const SignUp: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Track the current step and form data
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone_number: '',
  });

  // Function to go to the next step
  const nextStep = () => setStep(step + 1);

  // Function to go to the previous step
  const prevStep = () => setStep(step - 1);

  // Submit handler for the final form submission
  const signupHandler = async (values: typeof formData) => {
    try {
      await signup(values);
      console.log('User Successfully signed up', values.email);
      navigate('/home');
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  const handleRedirect = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <Card title="Sign Up">
          <Formik
            initialValues={formData}
            enableReinitialize
            validationSchema={
              step === 1 ? personalInfoSchema
              : step === 2 ? accountInfoSchema
              : contactInfoSchema
            }
            onSubmit={(values, actions) => {
              if (step < 3) {
                setFormData(values); // Save current step's data
                nextStep(); // Move to the next step
                actions.setSubmitting(false);
              } else {
                signupHandler(values); // Submit final data
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {step === 1 && (
                  <>
                    {/* Step 1: Personal Information */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                        First Name
                      </label>
                      <Field name="first_name" type="text" id="first_name" className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
                      <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                        Last Name
                      </label>
                      <Field name="last_name" type="text" id="last_name" className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
                      <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_of_birth">
                        Date of Birth
                      </label>
                      <Field name="date_of_birth" type="date" id="date_of_birth" className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
                      <ErrorMessage name="date_of_birth" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    {/* Step 2: Account Information */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <Field name="email" type="email" id="email" className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <Field name="password" type="password" id="password" className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <Field name="confirmPassword" type="password" id="confirmPassword" className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    {/* Step 3: Contact Information */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                      </label>
                      <Field name="address" type="text" id="address" className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
                        Phone Number
                      </label>
                      <Field name="phone_number" type="text" id="phone_number" className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none" />
                      <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg"
                    disabled={isSubmitting}
                  >
                    {step < 3 ? 'Next' : 'Submit'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>


         <div className='flex justify-center mt-4'>
        <span className='font-medium text-gray-400'>Got an account?</span>
        <button onClick={handleRedirect} className='font-bold text-black underline ml-1 cursor-pointer hover:text-blue-600'>Sign In</button>
      </div>
        <div className="mt-6 text-center">
          <B2Home />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
