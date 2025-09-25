import React from 'react';
import { CheckoutLayout } from '@/components/templates';
import { Heading1 } from '@/components/atoms';

export default function CheckoutPage() {
  return (
    <CheckoutLayout currentStep="checkout">
      <div>
        <Heading1>Checkout</Heading1>
        <p className="text-muted-foreground mt-4">
          This page will contain checkout forms, payment methods, and order
          summary.
        </p>
      </div>
    </CheckoutLayout>
  );
}
