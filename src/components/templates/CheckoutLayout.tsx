import React from 'react';
import { Header } from '../organisms';
import { StepIndicator } from '../molecules';
import { cn } from '@/lib/utils';

interface CheckoutLayoutProps {
  children: React.ReactNode;
  currentStep: string;
  className?: string;
}

const checkoutSteps = [
  {
    id: 'cart',
    title: 'Shopping Cart',
    description: 'Review your items'
  },
  {
    id: 'checkout',
    title: 'Checkout Details',
    description: 'Payment & shipping'
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Complete your order'
  },
  {
    id: 'confirmation',
    title: 'Order Complete',
    description: 'Thank you!'
  }
];

export const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  children,
  currentStep,
  className,
}) => {
  const completedSteps = React.useMemo(() => {
    const currentIndex = checkoutSteps.findIndex(step => step.id === currentStep);
    return checkoutSteps.slice(0, currentIndex).map(step => step.id);
  }, [currentStep]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <div className="flex-1">
        {/* Progress Steps */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-6">
            <StepIndicator
              steps={checkoutSteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              orientation="horizontal"
              className="justify-center"
            />
          </div>
        </div>

        {/* Main Content */}
        <main className={cn('container mx-auto px-4 py-8', className)}>
          {children}
        </main>
      </div>
    </div>
  );
};