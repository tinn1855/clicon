# Clicon E-commerce - Atomic Design Structure

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── atoms/           # Basic building blocks (Button, Input, Icon, Text)
│   ├── molecules/       # Simple combinations of atoms (SearchBar, ProductCard, NavItem)
│   ├── organisms/       # Complex components (Header, Footer, ProductGrid, Cart)
│   └── templates/       # Page layouts (PageLayout, AuthLayout, CheckoutLayout)
├── pages/               # Complete pages (Home, Product, Checkout, Profile)
├── hooks/               # Custom React hooks
├── store/               # State management (Zustand/Redux)
├── types/               # TypeScript type definitions
├── services/            # API calls and external services
├── utils/               # Utility functions
├── assets/              # Static assets (images, icons)
└── lib/                 # Third-party library configurations
```

## 🏗️ Atomic Design Principles

### Atoms (components/atoms/)

- **Purpose**: Basic building blocks that can't be broken down further
- **Examples**:
  - `Button` - Various button styles
  - `Input` - Form input fields
  - `Typography` - Text components (Heading, Paragraph)
  - `Icon` - Icon components
  - `Image` - Image component with loading states
  - `Badge` - Status badges
  - `Avatar` - User avatars

### Molecules (components/molecules/)

- **Purpose**: Simple combinations of atoms that function together
- **Examples**:
  - `SearchBar` - Input + Button
  - `ProductPrice` - Price + Discount badge
  - `SocialLogin` - Multiple social login buttons
  - `Breadcrumb` - Navigation breadcrumbs
  - `Rating` - Star rating component
  - `Quantity` - Quantity selector with +/- buttons

### Organisms (components/organisms/)

- **Purpose**: Complex components that combine molecules and atoms
- **Examples**:
  - `Header` - Navigation with logo, search, and user menu
  - `Footer` - Site footer with links and info
  - `ProductGrid` - Grid of product cards
  - `ShoppingCart` - Complete cart with items and totals
  - `ProductGallery` - Image gallery with thumbnails
  - `CheckoutForm` - Complete checkout form

### Templates (components/templates/)

- **Purpose**: Page-level layouts that define the structure
- **Examples**:
  - `PageLayout` - Common page layout with header/footer
  - `AuthLayout` - Layout for login/register pages
  - `CheckoutLayout` - Multi-step checkout layout
  - `ProfileLayout` - User profile layout with sidebar

### Pages (pages/)

- **Purpose**: Complete pages that use templates and pass real data
- **Examples**:
  - `HomePage` - Landing page
  - `ProductListPage` - Category/search results
  - `ProductDetailPage` - Individual product page
  - `CartPage` - Shopping cart page
  - `CheckoutPage` - Checkout process
  - `ProfilePage` - User profile

## 🎨 Design System

- **Colors**: Defined in Tailwind config
- **Typography**: System fonts with custom scaling
- **Spacing**: Consistent spacing scale
- **Components**: Shadcn UI as base, extended with custom components

## 📱 Responsive Design

All components are built mobile-first with Tailwind CSS responsive utilities.

## 🔄 State Management

Components are designed to be stateless when possible, with state managed at appropriate levels using React hooks and context/store.
