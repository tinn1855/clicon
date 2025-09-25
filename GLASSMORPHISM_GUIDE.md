# Glassmorphism Implementation Guide

## 🌟 Overview

This guide shows how to use the glassmorphism effects implemented in your Clicon ecommerce project.

## 📦 Components Available

### 1. GlassCard

```tsx
import { GlassCard } from '@/components/atoms';

// Basic usage
<GlassCard variant="light" className="p-6">
  <h3>Content here</h3>
</GlassCard>

// Interactive with animation
<GlassCard variant="medium" interactive animated="shimmer">
  <p>Hoverable card with shimmer effect</p>
</GlassCard>
```

### 2. GlassButton

```tsx
import { GlassButton } from '@/components/atoms';

<GlassButton variant="frosted" onClick={handleClick}>
  Click me
</GlassButton>;
```

### 3. GlassInput

```tsx
import { GlassInput } from '@/components/atoms';

<GlassInput variant="light" placeholder="Enter text..." type="email" />;
```

### 4. GlassModal

```tsx
import { GlassModal } from '@/components/atoms';

<GlassModal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="frosted">
  <h2>Modal Content</h2>
</GlassModal>;
```

### 5. GlassNavigation

```tsx
import { GlassNavigation } from '@/components/atoms';

<GlassNavigation variant="strong">
  <nav>Navigation items</nav>
</GlassNavigation>;
```

## 🎨 Variants Available

- `default` - Standard glass effect
- `light` - Subtle transparency
- `medium` - Balanced effect
- `strong` - Intense glass effect
- `dark` - Dark theme optimized
- `primary` - Uses primary color tint
- `secondary` - Uses secondary color tint
- `frosted` - Heavy blur with saturation
- `gradient-border` - Glass with gradient border

## 🪝 Hooks Available

### 1. useGlassOnScroll

```tsx
import { useGlassOnScroll } from '@/hooks';

function Header() {
  const isGlassy = useGlassOnScroll(100); // threshold in pixels

  return (
    <header className={isGlassy ? 'glass-strong' : 'glass-light'}>
      Navigation
    </header>
  );
}
```

### 2. useAdaptiveGlass

```tsx
import { useAdaptiveGlass } from '@/hooks';

function Component() {
  const { glassClass, textClass, isDarkTheme } = useAdaptiveGlass();

  return (
    <div className={glassClass}>
      <p className={textClass}>Adaptive text</p>
    </div>
  );
}
```

### 3. useGlassStyles

```tsx
import { useGlassStyles } from '@/hooks';

function CustomComponent() {
  const glassStyles = useGlassStyles({
    opacity: 0.15,
    blur: 20,
    borderOpacity: 0.3,
    shadowOpacity: 0.4,
  });

  return <div style={glassStyles}>Custom glass</div>;
}
```

### 4. useBackdropSupport

```tsx
import { useBackdropSupport } from '@/hooks';

function Component() {
  const isSupported = useBackdropSupport();

  if (!isSupported) {
    return <div className="fallback-style">Fallback UI</div>;
  }

  return <div className="glass">Glass effect</div>;
}
```

## 🎭 CSS Classes Available

Direct CSS classes you can use:

```css
/* Basic glass effects */
.glass          /* Default glass */
/* Default glass */
.glass-light    /* Light glass */
.glass-medium   /* Medium glass */
.glass-strong   /* Strong glass */
.glass-dark     /* Dark theme glass */

/* Colored glass */
.glass-primary    /* Primary color tint */
.glass-secondary  /* Secondary color tint */

/* Special effects */
.glass-frosted        /* Heavy frosted effect */
.glass-gradient-border /* Gradient border */

/* Interactive states */
.glass-hover    /* Hover effects */
.glass-pulse    /* Pulsing animation */
.glass-shimmer  /* Shimmer animation */

/* Text utilities */
.glass-text       /* Text shadow for glass */
.glass-text-light /* Light text on glass */
.glass-text-dark; /* Dark text on glass */
```

## 🚀 Usage Examples

### Hero Section with Glass

```tsx
<section className="bg-gradient-to-r from-purple-400 to-pink-500">
  <div className="container mx-auto px-4 py-12">
    <GlassCard variant="light" className="p-8 text-center">
      <h1 className="glass-text-light text-4xl font-bold mb-4">
        Welcome to Clicon
      </h1>
      <p className="glass-text-light mb-6">
        Discover amazing products with our glassmorphism UI
      </p>
      <GlassButton variant="frosted">Get Started</GlassButton>
    </GlassCard>
  </div>
</section>
```

### Glass Navigation that Changes on Scroll

```tsx
function Header() {
  const isScrolled = useGlassOnScroll(50);

  return (
    <GlassNavigation
      variant={isScrolled ? 'strong' : 'light'}
      className="transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Logo />
          <div className="flex gap-4">
            <GlassButton variant="light">Sign In</GlassButton>
            <GlassButton variant="medium">Sign Up</GlassButton>
          </div>
        </nav>
      </div>
    </GlassNavigation>
  );
}
```

### Contact Form with Glass

```tsx
<GlassCard variant="frosted" className="max-w-md mx-auto p-8">
  <h2 className="glass-text-light text-2xl font-bold mb-6">Contact Us</h2>
  <form className="space-y-4">
    <GlassInput placeholder="Your email" type="email" variant="light" />
    <GlassInput placeholder="Your message" variant="light" />
    <GlassButton variant="gradient-border" className="w-full">
      Send Message
    </GlassButton>
  </form>
</GlassCard>
```

## 📱 Responsive Considerations

The glassmorphism effects automatically reduce blur intensity on mobile devices for better performance:

```css
@media (max-width: 768px) {
  .glass,
  .glass-light,
  .glass-medium,
  .glass-strong {
    backdrop-filter: blur(8px); /* Reduced from 10-20px */
  }
}
```

## 🎨 Customization

You can customize the glass effects by modifying the CSS variables:

```css
:root {
  --primary-rgb: 25, 24, 26; /* For glass-primary */
  --secondary-rgb: 243, 244, 246; /* For glass-secondary */
}
```

## 🌈 Best Practices

1. **Use on colorful backgrounds** - Glassmorphism works best over gradients or images
2. **Limit nesting** - Avoid multiple glass layers for performance
3. **Consider accessibility** - Ensure text contrast remains readable
4. **Test on mobile** - Reduced blur may affect visual hierarchy
5. **Provide fallbacks** - Use `useBackdropSupport()` for unsupported browsers

## 🎯 Live Demo

Visit `/glassmorphism` route to see all components in action with interactive examples!
