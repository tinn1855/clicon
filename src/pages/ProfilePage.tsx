import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PageLayout } from '@/components/templates';
import {
  Heading1,
  Button,
  Card,
  CardContent,
  Separator,
  Input,
  Label,
} from '@/components/atoms';
import { useAuthStore } from '@/store';
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  Edit2,
  Save,
  X,
  Calendar,
  Phone,
} from 'lucide-react';

const profileSchema = Yup.object({
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
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
});

const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    )
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!user) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <Heading1>Please sign in to view your profile</Heading1>
          <Button onClick={() => navigate('/signin')} className="mt-4">
            Sign In
          </Button>
        </div>
      </PageLayout>
    );
  }

  const handleProfileUpdate = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }) => {
    setError('');
    try {
      updateUser(values);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handlePasswordChange = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setError('');
    try {
      // Mock password change - in real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess('Password changed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <div>
              <Heading1 className="text-2xl sm:text-3xl">My Profile</Heading1>
              <p className="text-muted-foreground mt-1">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground">
                Member since{' '}
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
                activeTab === 'profile'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
                activeTab === 'security'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </button>
          </div>

          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Personal Information
                  </h2>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <Formik
                    initialValues={{
                      firstName: user.firstName || '',
                      lastName: user.lastName || '',
                      email: user.email || '',
                      phone: user.phone || '',
                    }}
                    validationSchema={profileSchema}
                    onSubmit={handleProfileUpdate}
                  >
                    {({ isValid, dirty }) => (
                      <Form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Field
                              as={Input}
                              id="firstName"
                              name="firstName"
                              className="mt-1"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Field
                              as={Input}
                              id="lastName"
                              name="lastName"
                              className="mt-1"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Field
                            as={Input}
                            id="email"
                            name="email"
                            type="email"
                            className="mt-1"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number (Optional)</Label>
                          <Field
                            as={Input}
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="mt-1"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            type="submit"
                            disabled={!isValid || !dirty || isLoading}
                            className="flex items-center"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsEditing(false);
                              setError('');
                            }}
                            className="flex items-center"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Full Name
                          </p>
                          <p className="font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">
                            {user.phone || 'Not provided'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Member Since
                          </p>
                          <p className="font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Change Password
                    </h3>
                    <Formik
                      initialValues={{
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      }}
                      validationSchema={changePasswordSchema}
                      onSubmit={handlePasswordChange}
                      enableReinitialize
                    >
                      {({ isValid, dirty, resetForm }) => (
                        <Form className="space-y-4 max-w-md">
                          <div>
                            <Label htmlFor="currentPassword">
                              Current Password
                            </Label>
                            <Field
                              as={Input}
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              className="mt-1"
                            />
                            <ErrorMessage
                              name="currentPassword"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Field
                              as={Input}
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              className="mt-1"
                            />
                            <ErrorMessage
                              name="newPassword"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="confirmPassword">
                              Confirm New Password
                            </Label>
                            <Field
                              as={Input}
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              className="mt-1"
                            />
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={!isValid || !dirty || isLoading}
                            className="w-full sm:w-auto"
                            onClick={() => {
                              // Reset form after successful submission
                              setTimeout(() => resetForm(), 2000);
                            }}
                          >
                            Change Password
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Account Security
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">
                            Two-Factor Authentication
                          </p>
                          <p className="text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Login Alerts</p>
                          <p className="text-muted-foreground">
                            Get notified of new sign-ins to your account
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
