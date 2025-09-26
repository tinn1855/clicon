import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '../types';

interface PaginatedOrdersResult {
  orders: Order[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface OrderFilters {
  status?: OrderStatus | 'all';
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
}

interface OrderStore {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  getUserOrdersPaginated: (
    userId: string,
    page: number,
    pageSize: number,
    filters?: OrderFilters
  ) => PaginatedOrdersResult;
  cancelOrder: (orderId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  generateLargeDataset: (userId: string, count: number) => void;
}

// Mock orders data
const generateMockOrders = (userId: string): Order[] => [
  {
    id: '1',
    userId,
    status: 'delivered',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        productImage: '/images/headphones-1.jpg',
        price: 199.99,
        quantity: 1,
      },
    ],
    shipping: {
      method: 'Standard Shipping',
      cost: 9.99,
      estimatedDelivery: '2024-09-20',
      trackingNumber: 'TRK123456789',
      address: {
        id: '1',
        type: 'shipping',
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
      },
    },
    billing: {
      address: {
        id: '1',
        type: 'billing',
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
      },
    },
    payment: {
      method: 'card',
      status: 'completed',
      cardLast4: '4242',
    },
    subtotal: 199.99,
    shippingCost: 9.99,
    tax: 20.0,
    total: 229.98,
    createdAt: '2024-09-15T10:30:00Z',
    updatedAt: '2024-09-20T14:20:00Z',
  },
  {
    id: '2',
    userId,
    status: 'shipped',
    items: [
      {
        id: '2',
        productId: '2',
        productName: 'Smart Fitness Watch',
        productImage: '/images/watch-1.jpg',
        price: 299.99,
        quantity: 1,
      },
      {
        id: '3',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        productImage: '/images/headphones-1.jpg',
        price: 199.99,
        quantity: 1,
      },
    ],
    shipping: {
      method: 'Express Shipping',
      cost: 19.99,
      estimatedDelivery: '2024-09-28',
      trackingNumber: 'TRK987654321',
      address: {
        id: '1',
        type: 'shipping',
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
      },
    },
    billing: {
      address: {
        id: '1',
        type: 'billing',
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
      },
    },
    payment: {
      method: 'paypal',
      status: 'completed',
    },
    subtotal: 499.98,
    shippingCost: 19.99,
    tax: 50.0,
    total: 569.97,
    createdAt: '2024-09-25T15:45:00Z',
    updatedAt: '2024-09-26T09:15:00Z',
  },
  {
    id: '3',
    userId,
    status: 'processing',
    items: [
      {
        id: '4',
        productId: '2',
        productName: 'Smart Fitness Watch',
        productImage: '/images/watch-1.jpg',
        price: 299.99,
        quantity: 2,
      },
    ],
    shipping: {
      method: 'Standard Shipping',
      cost: 9.99,
      estimatedDelivery: '2024-10-05',
      address: {
        id: '1',
        type: 'shipping',
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
      },
    },
    billing: {
      address: {
        id: '1',
        type: 'billing',
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true,
      },
    },
    payment: {
      method: 'card',
      status: 'pending',
      cardLast4: '4242',
    },
    subtotal: 599.98,
    shippingCost: 9.99,
    tax: 60.0,
    total: 669.97,
    createdAt: '2024-09-26T08:00:00Z',
    updatedAt: '2024-09-26T08:00:00Z',
  },
];

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      isLoading: false,
      error: null,

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          ),
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getUserOrders: (userId) => {
        const state = get();
        let userOrders = state.orders.filter(
          (order) => order.userId === userId
        );

        // If no orders found, generate mock orders for demo
        if (userOrders.length === 0) {
          const mockOrders = generateMockOrders(userId);
          set((state) => ({
            orders: [...mockOrders, ...state.orders],
          }));
          userOrders = mockOrders;
        }

        return userOrders.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },

      getUserOrdersPaginated: (userId, page, pageSize, filters) => {
        const state = get();
        let userOrders = state.orders.filter(
          (order) => order.userId === userId
        );

        // If no orders found, generate mock orders for demo
        if (userOrders.length === 0) {
          const mockOrders = generateMockOrders(userId);
          set((state) => ({
            orders: [...mockOrders, ...state.orders],
          }));
          userOrders = mockOrders;
        }

        // Apply filters
        if (filters) {
          if (filters.status && filters.status !== 'all') {
            userOrders = userOrders.filter(
              (order) => order.status === filters.status
            );
          }

          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            userOrders = userOrders.filter(
              (order) =>
                order.id.toLowerCase().includes(query) ||
                order.items.some((item) =>
                  item.productName.toLowerCase().includes(query)
                )
            );
          }

          if (filters.startDate) {
            const startDate = new Date(filters.startDate);
            userOrders = userOrders.filter(
              (order) => new Date(order.createdAt) >= startDate
            );
          }

          if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            userOrders = userOrders.filter(
              (order) => new Date(order.createdAt) <= endDate
            );
          }
        }

        // Sort by creation date (newest first)
        userOrders.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const totalCount = userOrders.length;
        const totalPages = Math.ceil(totalCount / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedOrders = userOrders.slice(startIndex, endIndex);

        return {
          orders: paginatedOrders,
          totalCount,
          totalPages,
          currentPage: page,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        };
      },

      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId &&
            ['pending', 'confirmed', 'processing'].includes(order.status)
              ? {
                  ...order,
                  status: 'cancelled' as OrderStatus,
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
        }));
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      generateLargeDataset: (userId, count) => {
        const statuses: OrderStatus[] = [
          'pending',
          'confirmed',
          'processing',
          'shipped',
          'delivered',
          'cancelled',
          'returned',
        ];
        const productNames = [
          'Wireless Bluetooth Headphones',
          'Fitness Tracker Watch',
          'Laptop Computer',
          'Smartphone',
          'Gaming Mouse',
          'Mechanical Keyboard',
          'Monitor Display',
          'Tablet Device',
          'Wireless Earbuds',
          'Portable Speaker',
          'Camera DSLR',
          'Gaming Controller',
          'USB Drive',
          'External Hard Drive',
          'Power Bank',
        ];

        const largeDataset: Order[] = [];

        for (let i = 1; i <= count; i++) {
          const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];
          const randomProduct =
            productNames[Math.floor(Math.random() * productNames.length)];
          const randomPrice = Math.floor(Math.random() * 500) + 50;
          const randomQuantity = Math.floor(Math.random() * 3) + 1;
          const randomDate = new Date(
            2024,
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1
          );

          const order: Order = {
            id: `mock-${i}`,
            userId,
            status: randomStatus,
            items: [
              {
                id: `item-${i}`,
                productId: `product-${i}`,
                productName: randomProduct,
                productImage: `/images/${randomProduct
                  .toLowerCase()
                  .replace(/\s+/g, '-')}.jpg`,
                price: randomPrice,
                quantity: randomQuantity,
              },
            ],
            subtotal: randomPrice * randomQuantity,
            shippingCost: 9.99,
            tax: Math.round(randomPrice * randomQuantity * 0.08 * 100) / 100,
            total:
              Math.round(
                (randomPrice * randomQuantity +
                  9.99 +
                  randomPrice * randomQuantity * 0.08) *
                  100
              ) / 100,
            createdAt: randomDate.toISOString(),
            updatedAt: randomDate.toISOString(),
            shipping: {
              method: 'Standard Shipping',
              cost: 9.99,
              estimatedDelivery: new Date(
                randomDate.getTime() + 7 * 24 * 60 * 60 * 1000
              )
                .toISOString()
                .split('T')[0],
              trackingNumber:
                randomStatus === 'shipped' || randomStatus === 'delivered'
                  ? `TRK${Math.random().toString().substr(2, 9)}`
                  : undefined,
              address: {
                id: '1',
                type: 'shipping',
                firstName: 'John',
                lastName: 'Doe',
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'United States',
                isDefault: true,
              },
            },
            billing: {
              address: {
                id: '1',
                type: 'billing',
                firstName: 'John',
                lastName: 'Doe',
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'United States',
                isDefault: true,
              },
            },
            payment: {
              method: Math.random() > 0.5 ? 'card' : 'paypal',
              status: randomStatus === 'cancelled' ? 'failed' : 'completed',
              cardLast4:
                Math.random() > 0.5
                  ? Math.floor(Math.random() * 9999)
                      .toString()
                      .padStart(4, '0')
                  : undefined,
              transactionId: `tx_${Math.random().toString().substr(2, 12)}`,
            },
          };

          largeDataset.push(order);
        }

        set((state) => ({
          orders: [
            ...largeDataset,
            ...state.orders.filter((o) => !o.id.startsWith('mock-')),
          ],
        }));
      },
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);
