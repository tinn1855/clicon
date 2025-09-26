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
} from '@/components/atoms';
import { Price } from '@/components/atoms/Price';
import { useCartStore } from '@/store';
import {
  ArrowLeft,
  Shield,
  CreditCard,
  Smartphone,
  Truck,
  CheckCircle,
} from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState<any>(null);

  const shippingCost = 25;
  const tax = cart.subtotal * 0.1;
  const total = cart.subtotal + shippingCost + tax;

  // Load saved info from localStorage
  const getSavedInfo = () => {
    try {
      const saved = localStorage.getItem('checkoutInfo');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  const savedInfo = getSavedInfo();

  // Step 1: Shipping Information Schema
  const shippingSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('ZIP code is required'),
  });

  // Step 2: Payment Information Schema
  const paymentSchema = Yup.object({
    paymentMethod: Yup.string()
      .oneOf(['credit', 'paypal', 'cod'], 'Please select a payment method')
      .required('Payment method is required'),
    cardNumber: Yup.string().when('paymentMethod', {
      is: 'credit',
      then: (schema) =>
        schema
          .matches(/^\d{13,19}$/, 'Card number must be 13-19 digits')
          .required('Card number is required'),
      otherwise: (schema) => schema,
    }),
    cardName: Yup.string().when('paymentMethod', {
      is: 'credit',
      then: (schema) =>
        schema
          .min(3, 'Name must be at least 3 characters')
          .required('Cardholder name is required'),
      otherwise: (schema) => schema,
    }),
    expiryDate: Yup.string().when('paymentMethod', {
      is: 'credit',
      then: (schema) =>
        schema
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY')
          .required('Expiry date is required'),
      otherwise: (schema) => schema,
    }),
    cvv: Yup.string().when('paymentMethod', {
      is: 'credit',
      then: (schema) =>
        schema
          .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
          .required('CVV is required'),
      otherwise: (schema) => schema,
    }),
  });

  // Handle Step 1 (Shipping) completion
  const handleShippingSubmit = (values: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  }) => {
    setShippingData(values);
    setCurrentStep(2);
  };

  // Handle Step 2 (Payment) and final order submission
  const handlePaymentSubmit = async (values: {
    paymentMethod: string;
    cardNumber?: string;
    cardName?: string;
    expiryDate?: string;
    cvv?: string;
  }) => {
    // Save info to localStorage if requested
    if (saveInfo && shippingData) {
      const infoToSave = {
        firstName: shippingData.firstName,
        lastName: shippingData.lastName,
        email: shippingData.email,
        address: shippingData.address,
        city: shippingData.city,
        zipCode: shippingData.zipCode,
      };
      localStorage.setItem('checkoutInfo', JSON.stringify(infoToSave));
    }

    // Show success message
    setShowSuccess(true);

    // Clear cart
    clearCart();

    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md mx-4 text-center">
        <div className="mb-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Order Successful!
          </h2>
          <p className="text-gray-600">
            Thank you for your purchase. You will be redirected to home page
            shortly.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Redirecting...</span>
        </div>
      </div>
    </div>
  );

  if (showSuccess) {
    return (
      <PageLayout>
        <SuccessModal />
      </PageLayout>
    );
  }

  if (cart.items.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center">
          <Heading1 className="mb-4 text-xl sm:text-2xl lg:text-3xl">
            Your cart is empty
          </Heading1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            You need items in your cart to proceed with checkout.
          </p>
          <Button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 sm:px-8 sm:py-4"
          >
            Continue Shopping
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/cart')}
          className="mb-4 sm:mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>

        <Heading1 className="mb-6 sm:mb-8 text-center sm:text-left">
          Checkout
        </Heading1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2 order-2 xl:order-1">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Checkout Information
                </h2>
                <Formik
                  initialValues={{
                    firstName: savedInfo.firstName || '',
                    lastName: savedInfo.lastName || '',
                    email: savedInfo.email || '',
                    address: savedInfo.address || '',
                    city: savedInfo.city || '',
                    zipCode: savedInfo.zipCode || '',
                    paymentMethod: 'credit',
                    cardNumber: '',
                    cardName: '',
                    expiryDate: '',
                    cvv: '',
                  }}
                  validationSchema={shippingSchema}
                  onSubmit={handleShippingSubmit}
                >
                  {({ values }) => (
                    <Form className="space-y-6">
                      {/* Shipping Information Section */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-900">
                          Shipping Information
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                First Name
                              </label>
                              <Field
                                name="firstName"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="John"
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-red-500 text-sm mt-1 block"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Last Name
                              </label>
                              <Field
                                name="lastName"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                            <label className="block text-sm font-medium mb-2">
                              Email
                            </label>
                            <Field
                              name="email"
                              type="email"
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="john@example.com"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-sm mt-1 block"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Address
                            </label>
                            <Field
                              name="address"
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="123 Main Street"
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="text-red-500 text-sm mt-1 block"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                City
                              </label>
                              <Field
                                name="city"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="New York"
                              />
                              <ErrorMessage
                                name="city"
                                component="div"
                                className="text-red-500 text-sm mt-1 block"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                ZIP Code
                              </label>
                              <Field
                                name="zipCode"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="10001"
                              />
                              <ErrorMessage
                                name="zipCode"
                                component="div"
                                className="text-red-500 text-sm mt-1 block"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Information Section */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-900">
                          Payment Information
                        </h3>

                        <div className="mb-6">
                          <label className="block text-sm font-medium mb-3">
                            Payment Method
                          </label>
                          <div className="space-y-3">
                            <label
                              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                values.paymentMethod === 'credit'
                                  ? 'border-blue-600 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Field
                                type="radio"
                                name="paymentMethod"
                                value="credit"
                                className="mr-3"
                              />
                              <CreditCard className="w-5 h-5 mr-3" />
                              Credit/Debit Card
                            </label>

                            <label
                              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                values.paymentMethod === 'paypal'
                                  ? 'border-blue-600 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Field
                                type="radio"
                                name="paymentMethod"
                                value="paypal"
                                className="mr-3"
                              />
                              <Smartphone className="w-5 h-5 mr-3" />
                              PayPal
                            </label>

                            <label
                              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                values.paymentMethod === 'cod'
                                  ? 'border-blue-600 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Field
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                className="mr-3"
                              />
                              <Truck className="w-5 h-5 mr-3" />
                              Cash on Delivery
                            </label>
                          </div>
                          <ErrorMessage
                            name="paymentMethod"
                            component="div"
                            className="text-red-500 text-sm mt-1 block"
                          />
                        </div>

                        {/* Credit Card Fields */}
                        {values.paymentMethod === 'credit' && (
                          <div className="space-y-4 border-t pt-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Cardholder Name
                              </label>
                              <Field
                                name="cardName"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="John Doe"
                              />
                              <ErrorMessage
                                name="cardName"
                                component="div"
                                className="text-red-500 text-sm mt-1 block"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Card Number
                              </label>
                              <Field
                                name="cardNumber"
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="1234567890123456"
                              />
                              <ErrorMessage
                                name="cardNumber"
                                component="div"
                                className="text-red-500 text-sm mt-1 block"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Expiry Date
                                </label>
                                <Field
                                  name="expiryDate"
                                  type="text"
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                  placeholder="MM/YY"
                                />
                                <ErrorMessage
                                  name="expiryDate"
                                  component="div"
                                  className="text-red-500 text-sm mt-1 block"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  CVV
                                </label>
                                <Field
                                  name="cvv"
                                  type="text"
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                  placeholder="123"
                                />
                                <ErrorMessage
                                  name="cvv"
                                  component="div"
                                  className="text-red-500 text-sm mt-1 block"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Save Information Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveInfo"
                          checked={saveInfo}
                          onChange={(e) => setSaveInfo(e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="saveInfo"
                          className="text-sm text-gray-700"
                        >
                          Save my information for faster checkout next time
                        </label>
                      </div>

                      <Button type="submit" className="w-full mt-6 py-3">
                        Complete Order
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-1 order-1 xl:order-2">
            <Card className="sticky top-4">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <Price price={item.product.price * item.quantity} />
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="mb-4" />

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Subtotal</span>
                    <Price price={cart.subtotal} />
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Shipping</span>
                    <Price price={shippingCost} />
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Tax</span>
                    <Price price={tax} />
                  </div>
                  <Separator className="my-2 sm:my-3" />
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <Price price={total} />
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-green-600 mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-green-700">
                    Secure & Safe Payment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
