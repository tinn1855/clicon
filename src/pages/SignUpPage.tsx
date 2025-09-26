import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthLayout } from '@/components/templates';
import { Button, Input, Label } from '@/components/atoms';
import { useAuthStore } from '@/store';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';

// Password strength checker
const getPasswordStrength = (password: string) => {
  if (!password) return { score: 0, text: '', color: '' };

  let score = 0;
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*(),.?":{}|<>]/.test(password),
  ];

  score = checks.filter(Boolean).length;

  if (score < 2) return { score, text: 'Weak', color: 'text-red-500' };
  if (score < 4) return { score, text: 'Fair', color: 'text-yellow-500' };
  if (score < 5) return { score, text: 'Good', color: 'text-blue-500' };
  return { score, text: 'Strong', color: 'text-green-500' };
};

const signUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
    .required('First name is required'),

  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
    .required('Last name is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .test(
      'email-available',
      'This email is already registered',
      async (value) => {
        if (!value) return false;

        // Mock email check - in real app, this would be an API call
        const existingEmails = ['admin@example.com', 'test@test.com'];
        return !existingEmails.includes(value.toLowerCase());
      }
    )
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    )
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),

  agreeTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the Terms of Service and Privacy Policy')
    .required('You must agree to the Terms of Service and Privacy Policy'),
});

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
  }) => {
    setError('');

    try {
      // Show success message first
      setSuccess(true);

      // Register user
      await signup({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      // Redirect to home after successful registration and login
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    } catch {
      setSuccess(false);
      setError('Registration failed. Please try again.');
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Account created successfully!"
        subtitle="Welcome to our community. Signing you in..."
      >
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Your account has been created successfully.
          </p>
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            <span className="text-sm text-gray-600">Signing you in...</span>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of satisfied customers today."
    >
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, values }) => (
          <Form className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Field
                  as={Input}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="mt-1"
                  placeholder="John"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1 block"
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Field
                  as={Input}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="mt-1"
                  placeholder="Doe"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1 block"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1"
                placeholder="john@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1 block"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1 block"
              />
              {/* Password Strength Indicator */}
              {values.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1 bg-gray-200 rounded">
                      <div
                        className={`h-full rounded transition-all duration-300 ${
                          getPasswordStrength(values.password).score < 2
                            ? 'w-1/4 bg-red-500'
                            : getPasswordStrength(values.password).score < 4
                            ? 'w-2/4 bg-yellow-500'
                            : getPasswordStrength(values.password).score < 5
                            ? 'w-3/4 bg-blue-500'
                            : 'w-full bg-green-500'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        getPasswordStrength(values.password).color
                      }`}
                    >
                      {getPasswordStrength(values.password).text}
                    </span>
                  </div>
                </div>
              )}
              <div className="mt-2 text-xs text-gray-600">
                Password must contain at least 8 characters with uppercase,
                lowercase, and numbers.
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative mt-1">
                <Field
                  as={Input}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1 block"
              />
            </div>

            <div className="flex items-start">
              <Field
                type="checkbox"
                name="agreeTerms"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1 mr-3 flex-shrink-0"
              />
              <div className="flex-1">
                <Label htmlFor="agreeTerms" className="text-sm leading-5">
                  I agree to the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    Privacy Policy
                  </a>
                </Label>
                <ErrorMessage
                  name="agreeTerms"
                  component="div"
                  className="text-red-500 text-sm mt-1 block"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || !dirty || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{' '}
              </span>
              <a
                href="/signin"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign in
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
