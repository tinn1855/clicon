import React from 'react';
import { PageLayout } from '@/components/templates';
import { Heading1, Input, Button, Card, CardContent } from '@/components/atoms';
import { Package, Truck, CheckCircle } from 'lucide-react';

interface TrackingStep {
  status: string;
  date: string;
  completed: boolean;
}

interface TrackingResult {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  currentLocation: string;
  trackingSteps: TrackingStep[];
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = React.useState('');
  const [trackingResult, setTrackingResult] =
    React.useState<TrackingResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock tracking data
    setTrackingResult({
      orderNumber: orderNumber,
      status: 'shipped',
      estimatedDelivery: '2024-01-15',
      currentLocation: 'Distribution Center - Chicago, IL',
      trackingSteps: [
        { status: 'Order Placed', date: '2024-01-10', completed: true },
        { status: 'Processing', date: '2024-01-11', completed: true },
        { status: 'Shipped', date: '2024-01-12', completed: true },
        { status: 'Out for Delivery', date: '2024-01-15', completed: false },
        { status: 'Delivered', date: '2024-01-15', completed: false },
      ],
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Heading1 className="text-center mb-8">Track Your Order</Heading1>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="orderNumber"
                    className="block text-sm font-medium mb-2"
                  >
                    Order Number
                  </label>
                  <Input
                    id="orderNumber"
                    type="text"
                    placeholder="Enter your order number (e.g., ORD-12345)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Track Order
                </Button>
              </form>
            </CardContent>
          </Card>

          {trackingResult && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      Order #{trackingResult.orderNumber}
                    </h3>
                    <p className="text-muted-foreground">
                      Current Status:{' '}
                      <span className="font-medium text-primary">
                        {trackingResult.status}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Estimated Delivery: {trackingResult.estimatedDelivery}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {trackingResult.trackingSteps.map(
                      (step: TrackingStep, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <div
                            className={`p-2 rounded-full ${
                              step.completed
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {step.status === 'Order Placed' && (
                              <Package className="h-4 w-4" />
                            )}
                            {step.status === 'Processing' && (
                              <Package className="h-4 w-4" />
                            )}
                            {step.status === 'Shipped' && (
                              <Truck className="h-4 w-4" />
                            )}
                            {step.status === 'Out for Delivery' && (
                              <Truck className="h-4 w-4" />
                            )}
                            {step.status === 'Delivered' && (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                step.completed
                                  ? 'text-foreground'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {step.status}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {step.date}
                            </p>
                          </div>
                          {step.completed && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      )
                    )}
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
