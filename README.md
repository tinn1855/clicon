# 🛒 Clicon E-commerce Website

[![Built with React](https://img.shields.io/badge/Built%20with-React-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-green.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Nx Monorepo](https://img.shields.io/badge/Built%20with-Nx-143157.svg)](https://nx.dev)

A modern e-commerce website built with React, TypeScript, and Tailwind CSS. Clicon provides a complete online shopping experience with responsive design and advanced e-commerce features.

## 🌟 Key Features

### 🏠 **Homepage**

- **Hero Banner Slider**: Carousel showcasing featured products with smooth animations
- **Flash Sale**: Countdown timer for limited-time promotions
- **Product Carousels**:
  - Featured Products
  - Best Sellers
  - New Arrivals
  - Deals & Discounts
- **Category Carousel**: Browse products by category
- **Brand Carousel**: Popular brand showcase
- **Testimonials**: Customer reviews and feedback
- **Service Features**: Free shipping, easy returns, 24/7 support

### 🛍️ **Shop Page**

- **Advanced Search**: Smart search with suggestions
- **Smart Filters**:
  - 📂 Category Filter
  - 🏷️ Brand Filter
  - 💰 Price Range Slider
  - ⭐ Rating Filter
  - 📦 Stock Filter (in-stock items only)
- **Sorting Options**:
  - Newest First / Oldest First
  - Price: Low to High / High to Low
  - Best Rating / Most Reviews
  - Name: A-Z
- **View Modes**: Grid view & List view
- **Responsive Pagination**:
  - Mobile: `< 1 2 3 >`
  - Desktop: `Previous | 1 2 3 ... 10 | Next`
  - Dynamic page size (10, 20, 50, 100 items)
- **Active Filters Display**: Show and clear applied filters
- **URL Synchronization**: Share filtered results via URL

### 📱 **Product Detail Page**

- **Product Gallery**: Product images with zoom and thumbnails
- **Product Information**:
  - Original price & discount price
  - Star ratings and review count
  - Detailed description
  - Specifications
- **Product Options**: Size, color, variant selection
- **Quick Actions**:
  - ➕ Add to Cart
  - ❤️ Add to Wishlist
  - 📤 Share Product
- **Customer Reviews**: Customer ratings and comments
- **Related Products**: Related product suggestions
- **Product Features**:
  - 🚚 Free Shipping info
  - 🔄 Return Policy
  - 🛡️ Warranty Information

### 🛒 **Shopping Cart**

- **Cart Management**:
  - Add/remove/update product quantities
  - Clear entire cart
  - Automatic total calculation
- **Product Information**: Images, name, price, quantity
- **Continue Shopping**: Link back to shop
- **Proceed to Checkout**: Move to checkout process
- **Empty Cart State**: Message when cart is empty

### 💖 **Wishlist**

- **Wishlist Management**:
  - Add/remove favorite products
  - Move all items to cart
  - Share wishlist
- **Sorting Options**:
  - Recently Added
  - Name A-Z
  - Price Low to High
- **Quick Actions** for each product:
  - 🛒 Add to Cart
  - 🗑️ Remove from Wishlist
- **Empty Wishlist State**: Browse products suggestion

### 💳 **Checkout Process**

- **Multi-step Checkout**:
  1. **Shipping Information**: Delivery address
  2. **Payment Method**: Credit card, PayPal, etc.
  3. **Order Review**: Review order details
- **Form Validation**: Input validation
- **Order Summary**: Order total and fees
- **Secure Payment**: Encrypted payment information
- **Order Confirmation**: Successful order confirmation

### 👤 **User Authentication**

- **Sign In/Sign Up**: Login and account registration
- **Forgot Password**: Password recovery
- **Protected Routes**: Protect pages requiring login
- **User Session**: Session management

### 📋 **User Profile**

- **Profile Management**: Update personal information
- **Order History**: Order history tracking
- **Address Book**: Manage delivery addresses
- **Account Settings**: Account configuration

### 📦 **Order Tracking**

- **Order Status**: Real-time order status
- **Tracking Number**: Shipping tracking code
- **Delivery Updates**: Delivery notifications

### 📞 **Support Pages**

- **About Us**: Company information
- **Contact**: Contact information and message form
- **Track Order**: Order lookup

## 🎨 Design & UX

### 📱 **Mobile-First Responsive**

- **Breakpoints**: 375px+ → 640px+ → 768px+ → 1024px+
- **Touch-Friendly**: Mobile-optimized buttons and interactions
- **Responsive Images**: Auto-resizing images
- **Mobile Navigation**: Collapsed mobile menu

### 🎭 **Modern UI Components**

- **Design System**: Using shadcn/ui components
- **Consistent Styling**: Unified theme across the site
- **Dark/Light Mode Ready**: Prepared for dark mode
- **Smooth Animations**: Transitions and hover effects

### ⚡ **Performance Optimized**

- **Lazy Loading**: Components and images load on demand
- **Code Splitting**: Smaller bundles for faster loading
- **Optimized Images**: WebP format and responsive sizing
- **Caching Strategy**: API response caching

## 🛠️ User Guide

### 🚀 **Getting Started with Shopping**

1. **Browse Products**:

   ```
   - Visit homepage (/) to view featured products
   - Go to Shop (/shop) to browse all products
   - Use search bar to find specific products
   ```

2. **Filtering & Searching**:

   ```
   - Use sidebar filters on Shop page
   - Select category, brand, price range
   - Apply rating filter
   - Sort by price, rating, date
   ```

3. **View Product Details**:
   ```
   - Click on product to view details
   - View image gallery, read description, reviews
   - Select options (size, color) if available
   ```

### 🛒 **Cart Management**

1. **Adding Products**:

   ```
   - Click "Add to Cart" from product card
   - Or from product detail page
   - Select desired quantity
   ```

2. **Managing Cart**:

   ```
   - Go to Cart page (/cart)
   - Update quantity using +/- buttons
   - Remove products using trash icon
   - Clear entire cart if needed
   ```

3. **Checkout**:
   ```
   - Click "Proceed to Checkout"
   - Fill in shipping information
   - Select payment method
   - Review and confirm order
   ```

### 💖 **Using Wishlist**

1. **Adding to Wishlist**:

   ```
   - Click heart icon on product card
   - Or from product detail page
   - Login required to save wishlist
   ```

2. **Managing Wishlist**:
   ```
   - Go to Wishlist page (/wishlist)
   - Sort by preference
   - Move products to cart
   - Remove from wishlist
   - Share wishlist with friends
   ```

### 👤 **User Account**

1. **Sign Up/Sign In**:

   ```
   - Click "Sign In" in header
   - Create new account or login
   - Use email/password
   ```

2. **Managing Profile**:
   ```
   - Go to Profile page (/profile)
   - Update personal information
   - Manage addresses
   - View order history
   ```

## 🎯 Advanced Features

### 🔍 **Smart Search**

- **Auto-suggest**: Keyword suggestions while typing
- **Search History**: Save previous searches
- **Advanced Filters**: Combine multiple filters
- **URL-based Search**: Share search results via URL

### 📊 **Analytics & Tracking**

- **User Behavior**: Track user behavior
- **Product Views**: Count product views
- **Conversion Tracking**: Track conversion rates

### 🎨 **Customization**

- **Theme Options**: Light/Dark mode toggle
- **Language Support**: Multi-language (EN/VI)
- **Currency Selector**: Multiple currencies

## 🛡️ Security & Privacy

- **Data Encryption**: User data encryption
- **Secure Payment**: PCI DSS compliant
- **Privacy Policy**: Clear privacy policy
- **GDPR Compliant**: GDPR regulation compliance

## 📈 SEO & Marketing

- **SEO Optimized**: Meta tags, structured data
- **Social Media Integration**: Share on social platforms
- **Email Marketing**: Newsletter subscription
- **Promotion System**: Discount codes, flash sales

---

## 💻 Development Setup

---

## 💻 Development Setup

### 🔧 **Prerequisites**

```bash
- Node.js 20.19+ or 22.12+
- npm or pnpm
- Git
```

### ⚡ **Quick Start**

1. **Clone Repository**:

   ```bash
   git clone <repository-url>
   cd clicon-ecommerce
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start Development Server**:

   ```bash
   npx nx serve clicon-ecommerce
   # or
   npm run dev
   ```

4. **Open Browser**: http://localhost:4200

### 🏗️ **Build Commands**

```bash
# Development server
npx nx serve clicon-ecommerce

# Production build
npx nx build clicon-ecommerce

# Run tests
npx nx test clicon-ecommerce

# Run linting
npx nx lint clicon-ecommerce

# View project graph
npx nx graph
```

## 🏗️ Technical Architecture

### 📁 **Project Structure**

```
src/
├── app/                    # App configuration & routing
├── components/            # UI Components (Atomic Design)
│   ├── atoms/            # Basic components (Button, Input, etc.)
│   ├── molecules/        # Composed components (ProductCard, etc.)
│   ├── organisms/        # Complex components (Header, Footer)
│   ├── templates/        # Page layouts
│   └── ui/              # shadcn/ui components
├── pages/                # Page components
├── store/                # State management (Zustand)
├── hooks/                # Custom React hooks
├── services/             # API services
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── styles/               # Global styles
```

### 🔧 **Tech Stack**

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Form Handling**: Formik + Yup
- **Build Tool**: Vite
- **Development**: Nx Monorepo
- **Icons**: Lucide React
- **Animations**: Framer Motion (Ready)

### 🎯 **Design Patterns**

- **Atomic Design**: Component organization
- **Container/Presentational**: Logic separation
- **Custom Hooks**: Reusable logic
- **Type Safety**: Full TypeScript coverage

## 🚀 Deployment

### 📦 **Production Build**

```bash
npx nx build clicon-ecommerce
```

### 🌐 **Deployment Options**

- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **AWS S3 + CloudFront**: Scalable hosting
- **Docker**: Containerized deployment

### 🔒 **Environment Variables**

```bash
REACT_APP_API_URL=your-api-url
REACT_APP_STRIPE_KEY=your-stripe-key
REACT_APP_GOOGLE_ANALYTICS=your-ga-id
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Documentation**: See this README
- **Issues**: Create GitHub issue
- **Email**: support@clicon.com

## 🔗 Useful Links

### 📚 **Development Resources**

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Nx Documentation](https://nx.dev/getting-started)

### 🎨 **Design Resources**

- [Figma Design System](https://figma.com/clicon-design)
- [Brand Guidelines](docs/brand-guidelines.md)
- [UI Component Library](docs/component-library.md)

---

<div align="center">

**🛒 Clicon E-commerce - Modern Shopping Experience**

_Built with ❤️ using React, TypeScript & Tailwind CSS_

[![GitHub](https://img.shields.io/github/stars/username/clicon-ecommerce?style=social)](https://github.com/username/clicon-ecommerce)
[![Twitter](https://img.shields.io/twitter/follow/clicon_shop?style=social)](https://twitter.com/clicon_shop)

</div>
