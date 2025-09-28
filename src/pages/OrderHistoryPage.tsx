import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/templates';
import {
  Heading1,
  Button,
  Card,
  CardContent,
  Separator,
  Input,
} from '@/components/atoms';
import { ShadcnPagination } from '@/components/ShadcnPagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthStore, useOrderStore } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';
import { Order, OrderStatus } from '@/types';
import {
  ArrowLeft,
  Package,
  Search,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  X,
  RotateCcw,
  CreditCard,
  MapPin,
  Database,
} from 'lucide-react';

const orderStatusConfig = {
  pending: {
    label: 'Pending',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmed',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: CheckCircle,
  },
  processing: {
    label: 'Processing',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: Package,
  },
  shipped: {
    label: 'Shipped',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: X,
  },
  returned: {
    label: 'Returned',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    icon: RotateCcw,
  },
};

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    getUserOrdersPaginated,
    cancelOrder,
    generateLargeDataset,
    isLoading,
    error,
  } = useOrderStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Paginated results
  const paginatedResult = useMemo(() => {
    if (!user || !isAuthenticated) {
      return {
        orders: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        hasNext: false,
        hasPrev: false,
      };
    }

    return getUserOrdersPaginated(user.id, currentPage, itemsPerPage, {
      status: statusFilter,
      searchQuery: debouncedSearchQuery,
    });
  }, [
    user,
    isAuthenticated,
    currentPage,
    itemsPerPage,
    statusFilter,
    debouncedSearchQuery,
    getUserOrdersPaginated,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedOrder(null); // Close details when changing page
  };

  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to first page
    setSelectedOrder(null);
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
      // Results will be updated automatically due to memoization
    }
  };

  const handleGenerateTestData = () => {
    if (
      user &&
      window.confirm(
        'Generate 1000 test orders? This will replace existing test data.'
      )
    ) {
      generateLargeDataset(user.id, 1000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      card: 'Credit Card',
      paypal: 'PayPal',
      bank_transfer: 'Bank Transfer',
      cash_on_delivery: 'Cash on Delivery',
    };
    return labels[method] || method;
  };

  const canCancelOrder = (order: Order) => {
    return ['pending', 'confirmed', 'processing'].includes(order.status);
  };

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <Heading1>Please sign in to view your order history</Heading1>
          <Button onClick={() => navigate('/signin')} className="mt-4">
            Sign In
          </Button>
        </div>
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

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

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <div>
              <Heading1 className="text-2xl sm:text-3xl flex items-center">
                <Package className="h-6 w-6 mr-3" />
                Order History
              </Heading1>
              <p className="text-muted-foreground mt-1">
                Track and manage your orders
              </p>
            </div>

            {/* Test Data Generator */}
            <Button
              variant="outline"
              onClick={handleGenerateTestData}
              className="flex items-center"
            >
              <Database className="h-4 w-4 mr-2" />
              Generate Test Data
            </Button>
          </div>{' '}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by order ID or product name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="sm:w-48">
                  <Select
                    value={statusFilter}
                    onValueChange={(value) =>
                      setStatusFilter(value as OrderStatus | 'all')
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="returned">Returned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Orders List */}
          {paginatedResult.orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {searchQuery || statusFilter !== 'all'
                    ? 'No orders found'
                    : 'No orders yet'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start shopping to see your orders here'}
                </p>
                <div className="space-x-2">
                  <Button onClick={() => navigate('/shop')}>
                    Continue Shopping
                  </Button>
                  <Button variant="outline" onClick={handleGenerateTestData}>
                    Generate Test Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4">
                {paginatedResult.orders.map((order: Order) => {
                  const statusConfig = orderStatusConfig[order.status];
                  const StatusIcon = statusConfig.icon;

                  return (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold">
                                Order #{order.id}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(order.createdAt)}
                              </p>
                            </div>
                            <div
                              className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color} ${statusConfig.bgColor} border ${statusConfig.borderColor}`}
                            >
                              <StatusIcon className="h-4 w-4 mr-1" />
                              {statusConfig.label}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setSelectedOrder(
                                  selectedOrder?.id === order.id ? null : order
                                )
                              }
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              {selectedOrder?.id === order.id
                                ? 'Hide'
                                : 'View'}{' '}
                              Details
                            </Button>

                            {canCancelOrder(order) && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelOrder(order.id)}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                Cancel Order
                              </Button>
                            )}

                            {order.shipping.trackingNumber && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  navigate(
                                    `/track-order?tracking=${order.shipping.trackingNumber}`
                                  )
                                }
                              >
                                <Truck className="h-4 w-4 mr-1" />
                                Track
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total Amount
                            </p>
                            <p className="font-semibold">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Items
                            </p>
                            <p className="font-semibold">
                              {order.items.length} items
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Payment
                            </p>
                            <p className="font-semibold">
                              {getPaymentMethodLabel(order.payment.method)}
                            </p>
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="space-y-2">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                                <Package className="h-6 w-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {item.productName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} ×{' '}
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-muted-foreground">
                              +{order.items.length - 2} more items
                            </p>
                          )}
                        </div>

                        {/* Detailed View */}
                        {selectedOrder?.id === order.id && (
                          <>
                            <Separator className="my-6" />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* All Items */}
                              <div>
                                <h4 className="font-semibold mb-3">
                                  Order Items
                                </h4>
                                <div className="space-y-3">
                                  {order.items.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center space-x-3 p-3 border rounded-lg"
                                    >
                                      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                                        <Package className="h-8 w-8 text-gray-400" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium">
                                          {item.productName}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          Quantity: {item.quantity}
                                        </p>
                                        <p className="text-sm font-medium">
                                          {formatPrice(
                                            item.price * item.quantity
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Order Details */}
                              <div className="space-y-6">
                                {/* Pricing Breakdown */}
                                <div>
                                  <h4 className="font-semibold mb-3">
                                    Order Summary
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Subtotal</span>
                                      <span>{formatPrice(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Shipping</span>
                                      <span>
                                        {formatPrice(order.shippingCost)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax</span>
                                      <span>{formatPrice(order.tax)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                      <span>Total</span>
                                      <span>{formatPrice(order.total)}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                  <h4 className="font-semibold mb-3 flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Shipping Address
                                  </h4>
                                  <div className="text-sm space-y-1">
                                    <p className="font-medium">
                                      {order.shipping.address.firstName}{' '}
                                      {order.shipping.address.lastName}
                                    </p>
                                    <p>{order.shipping.address.street}</p>
                                    <p>
                                      {order.shipping.address.city},{' '}
                                      {order.shipping.address.state}{' '}
                                      {order.shipping.address.zipCode}
                                    </p>
                                    <p>{order.shipping.address.country}</p>
                                  </div>
                                </div>

                                {/* Payment Info */}
                                <div>
                                  <h4 className="font-semibold mb-3 flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Payment Information
                                  </h4>
                                  <div className="text-sm space-y-1">
                                    <p>
                                      {getPaymentMethodLabel(
                                        order.payment.method
                                      )}
                                    </p>
                                    {order.payment.cardLast4 && (
                                      <p>
                                        **** **** **** {order.payment.cardLast4}
                                      </p>
                                    )}
                                    <p className="capitalize">
                                      Status: {order.payment.status}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination */}
              <ShadcnPagination
                currentPage={paginatedResult.currentPage}
                totalPages={paginatedResult.totalPages}
                onPageChange={handlePageChange}
                pageSize={itemsPerPage}
                onPageSizeChange={handlePageSizeChange}
                totalCount={paginatedResult.totalCount}
                isLoading={isLoading}
                className="mt-8"
              />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
