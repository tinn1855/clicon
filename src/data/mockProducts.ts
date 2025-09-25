import { Product } from '@/types';
import {
  TECH_CATEGORIES,
  CATEGORY_PRICE_RANGES,
  DISCOUNT_PATTERNS,
  PRODUCT_TAGS,
} from './categories';
import { getUniqueProductImages } from '@/utils/imageUtils';

// Unsplash collections for different product categories
const UNSPLASH_COLLECTIONS = {
  keyboards: ['technology', 'computer', 'workspace', 'gaming'],
  mice: ['technology', 'computer', 'gaming', 'workspace'],
  laptops: ['technology', 'computer', 'laptop', 'workspace'],
  monitors: ['technology', 'computer', 'screen', 'workspace'],
  headphones: ['technology', 'music', 'headphones', 'gaming'],
  webcams: ['technology', 'computer', 'camera', 'workspace'],
  speakers: ['technology', 'music', 'audio', 'workspace'],
  tablets: ['technology', 'tablet', 'mobile', 'workspace'],
  accessories: ['technology', 'computer', 'workspace', 'accessories'],
};

// Generate realistic product names
const generateProductName = (
  categoryKey: string,
  brand: string,
  subcategory: string
): string => {
  const namePatterns = {
    keyboards: [
      `${brand} ${subcategory} Keyboard Pro`,
      `${brand} K-${Math.floor(Math.random() * 900 + 100)} ${subcategory}`,
      `${brand} ${subcategory} Elite Gaming Keyboard`,
      `${brand} Wireless ${subcategory} Keyboard`,
      `${brand} Pro ${subcategory} RGB Keyboard`,
    ],
    mice: [
      `${brand} ${subcategory} Gaming Mouse`,
      `${brand} M-${Math.floor(Math.random() * 900 + 100)} ${subcategory}`,
      `${brand} Pro ${subcategory} Mouse`,
      `${brand} ${subcategory} Precision Mouse`,
      `${brand} Wireless ${subcategory} Mouse`,
    ],
    laptops: [
      `${brand} ${subcategory} Laptop ${Math.floor(
        Math.random() * 9000 + 1000
      )}`,
      `${brand} ${subcategory} Pro Series`,
      `${brand} ${subcategory} Elite Edition`,
      `${brand} ${subcategory} Professional`,
      `${brand} ${subcategory} Performance Series`,
    ],
    monitors: [
      `${brand} ${subcategory} Monitor Pro`,
      `${brand} ${Math.floor(Math.random() * 9) + 21}"${subcategory} Display`,
      `${brand} ${subcategory} Professional Monitor`,
      `${brand} UltraWide ${subcategory} Monitor`,
      `${brand} ${subcategory} Gaming Display`,
    ],
    headphones: [
      `${brand} ${subcategory} Headphones Pro`,
      `${brand} ${subcategory} Audio Series`,
      `${brand} Wireless ${subcategory} Headset`,
      `${brand} ${subcategory} Studio Monitor`,
      `${brand} ${subcategory} Gaming Headset`,
    ],
    webcams: [
      `${brand} ${subcategory} Webcam Pro`,
      `${brand} ${subcategory} Streaming Camera`,
      `${brand} Professional ${subcategory} Webcam`,
      `${brand} ${subcategory} Conference Camera`,
      `${brand} ${subcategory} HD Webcam`,
    ],
    speakers: [
      `${brand} ${subcategory} Speaker System`,
      `${brand} ${subcategory} Audio Pro`,
      `${brand} Wireless ${subcategory} Speakers`,
      `${brand} ${subcategory} Sound System`,
      `${brand} ${subcategory} Premium Audio`,
    ],
    tablets: [
      `${brand} ${subcategory} Tablet Pro`,
      `${brand} ${subcategory} Pad Series`,
      `${brand} Professional ${subcategory} Tablet`,
      `${brand} ${subcategory} Digital Canvas`,
      `${brand} ${subcategory} Mobile Workstation`,
    ],
    accessories: [
      `${brand} ${subcategory} Pro`,
      `${brand} Premium ${subcategory}`,
      `${brand} Professional ${subcategory}`,
      `${brand} ${subcategory} Series`,
      `${brand} ${subcategory} Elite`,
    ],
  };

  const patterns = namePatterns[categoryKey as keyof typeof namePatterns] || [
    `${brand} ${subcategory} Pro`,
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
};

// Generate realistic descriptions
const generateDescription = (
  categoryKey: string,
  name: string,
  specs: Record<string, string>
): string => {
  const features = Object.entries(specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  const descriptionTemplates = {
    keyboards: [
      `Experience premium typing with the ${name}. Features ${features}. Perfect for gaming and productivity. Durable construction with premium materials and customizable settings.`,
      `Elevate your gaming experience with the ${name}. Built with ${features}. Designed for competitive gaming with ultra-responsive keys and stunning RGB lighting.`,
      `Professional-grade keyboard designed for enthusiasts. The ${name} offers ${features}. Ideal for both work and gaming applications.`,
    ],
    mice: [
      `Precision gaming mouse engineered for victory. The ${name} delivers ${features}. Ultra-responsive sensor with customizable DPI settings for any gaming style.`,
      `Professional gaming mouse with advanced features. Features ${features}. Ergonomic design for extended gaming sessions with customizable RGB lighting.`,
      `High-performance mouse designed for competitive gaming. The ${name} offers ${features}. Perfect balance of speed, accuracy, and comfort.`,
    ],
    laptops: [
      `Powerful laptop designed for modern professionals. The ${name} features ${features}. Perfect for work, gaming, and creative applications.`,
      `High-performance laptop with cutting-edge technology. Features ${features}. Designed for demanding applications and multitasking.`,
      `Premium laptop combining performance and portability. The ${name} offers ${features}. Ideal for professionals and content creators.`,
    ],
    monitors: [
      `Professional display for work and gaming. The ${name} features ${features}. Stunning visual quality with accurate colors and smooth performance.`,
      `High-quality monitor designed for professionals. Features ${features}. Perfect for gaming, content creation, and productivity.`,
      `Premium display with advanced technology. The ${name} offers ${features}. Exceptional visual experience for any application.`,
    ],
    headphones: [
      `Premium audio experience with the ${name}. Features ${features}. Superior sound quality with comfortable design for extended use.`,
      `Professional headphones for audiophiles. Features ${features}. Crystal-clear audio with deep bass and precise highs.`,
      `High-quality audio solution designed for professionals. The ${name} offers ${features}. Perfect for gaming, music, and communication.`,
    ],
    webcams: [
      `Professional webcam for streaming and conferences. The ${name} features ${features}. Crystal-clear video quality with advanced features.`,
      `High-definition camera for professional use. Features ${features}. Perfect for streaming, conferences, and content creation.`,
      `Premium webcam with advanced technology. The ${name} offers ${features}. Superior video quality for any application.`,
    ],
    speakers: [
      `Premium audio system for exceptional sound. The ${name} features ${features}. Rich, detailed audio with powerful bass and clear highs.`,
      `Professional speaker system designed for audiophiles. Features ${features}. Immersive sound experience for music and gaming.`,
      `High-quality audio solution with advanced features. The ${name} offers ${features}. Perfect for desktop and entertainment use.`,
    ],
    tablets: [
      `Versatile tablet for work and creativity. The ${name} features ${features}. Perfect for digital art, productivity, and entertainment.`,
      `Professional tablet designed for creators. Features ${features}. Powerful performance with intuitive touch interface.`,
      `Premium tablet with advanced capabilities. The ${name} offers ${features}. Ideal for professionals and creative applications.`,
    ],
    accessories: [
      `Essential accessory for your setup. The ${name} features ${features}. High-quality construction with practical design.`,
      `Professional accessory designed for performance. Features ${features}. Durable and reliable for everyday use.`,
      `Premium accessory with advanced features. The ${name} offers ${features}. Perfect complement to your tech setup.`,
    ],
  };

  const templates = descriptionTemplates[
    categoryKey as keyof typeof descriptionTemplates
  ] || [
    `High-quality product with ${features}. Professional-grade construction and design.`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
};

// Generate Unsplash image URLs
const generateImageUrls = (
  categoryKey: string,
  productName: string,
  productId?: string
): string[] => {
  // If we have a productId, use unique image generation
  if (productId) {
    return getUniqueProductImages(productId, categoryKey, 4);
  }

  // Fallback to original random generation for backwards compatibility
  const collections = UNSPLASH_COLLECTIONS[
    categoryKey as keyof typeof UNSPLASH_COLLECTIONS
  ] || ['technology'];
  const baseQuery = collections[Math.floor(Math.random() * collections.length)];

  return [
    `https://images.unsplash.com/photo-1${Math.floor(
      Math.random() * 900000000 + 500000000
    )}?w=800&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&${encodeURIComponent(
      baseQuery
    )}`,
    `https://images.unsplash.com/photo-1${Math.floor(
      Math.random() * 900000000 + 500000000
    )}?w=800&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&${encodeURIComponent(
      baseQuery
    )}`,
    `https://images.unsplash.com/photo-1${Math.floor(
      Math.random() * 900000000 + 500000000
    )}?w=800&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&${encodeURIComponent(
      baseQuery
    )}`,
    `https://images.unsplash.com/photo-1${Math.floor(
      Math.random() * 900000000 + 500000000
    )}?w=800&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3&${encodeURIComponent(
      baseQuery
    )}`,
  ];
};

// Generate random specs for a category
const generateRandomSpecs = (categoryKey: string): Record<string, string> => {
  const category = TECH_CATEGORIES[categoryKey as keyof typeof TECH_CATEGORIES];
  if (!category.specs) return {};

  const specs: Record<string, string> = {};

  Object.entries(category.specs).forEach(([specKey, options]) => {
    if (Math.random() > 0.3) {
      // 70% chance to include each spec
      specs[specKey] = options[Math.floor(Math.random() * options.length)];
    }
  });

  return specs;
};

// Generate price with realistic distribution
const generatePrice = (
  categoryKey: string
): { price: number; originalPrice?: number } => {
  const priceRange =
    CATEGORY_PRICE_RANGES[categoryKey as keyof typeof CATEGORY_PRICE_RANGES];
  if (!priceRange) return { price: 99.99 };

  // Generate base price with slight preference for lower prices
  const randomFactor = Math.pow(Math.random(), 1.5); // Bias towards lower prices
  const basePrice =
    priceRange.min + (priceRange.max - priceRange.min) * randomFactor;

  // Round to realistic price points
  let price = Math.round(basePrice / 5) * 5 - 0.01; // End in .99, .95, etc.
  if (price % 10 === 4) price += 5; // Convert .94 to .99

  // Determine if there's a discount
  let cumulativeProbability = 0;
  let discount = 0;

  for (const pattern of DISCOUNT_PATTERNS) {
    cumulativeProbability += pattern.probability;
    if (Math.random() <= cumulativeProbability) {
      discount = pattern.discount;
      break;
    }
  }

  if (discount > 0) {
    const originalPrice = price;
    price = Math.round((price * (1 - discount)) / 5) * 5 - 0.01;
    return { price, originalPrice };
  }

  return { price };
};

// Generate random tags
const generateTags = (): string[] => {
  const numTags = Math.floor(Math.random() * 4) + 1; // 1-4 tags
  const selectedTags: string[] = [];

  while (selectedTags.length < numTags) {
    const tag = PRODUCT_TAGS[Math.floor(Math.random() * PRODUCT_TAGS.length)];
    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);
    }
  }

  return selectedTags;
};

// Generate single product
export const generateProduct = (id: string, categoryKey?: string): Product => {
  // Select random category if not specified
  const categories = Object.keys(TECH_CATEGORIES);
  const selectedCategory =
    categoryKey || categories[Math.floor(Math.random() * categories.length)];
  const category =
    TECH_CATEGORIES[selectedCategory as keyof typeof TECH_CATEGORIES];

  // Select random subcategory and brand
  const subcategory =
    category.subcategories[
      Math.floor(Math.random() * category.subcategories.length)
    ];
  const brand =
    category.brands[Math.floor(Math.random() * category.brands.length)];

  // Generate product details
  const name = generateProductName(selectedCategory, brand, subcategory);
  const specs = generateRandomSpecs(selectedCategory);
  const description = generateDescription(selectedCategory, name, specs);
  const images = generateImageUrls(selectedCategory, name, id);
  const { price, originalPrice } = generatePrice(selectedCategory);
  const tags = generateTags();

  // Generate realistic ratings and reviews
  const rating = Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0 - 5.0 range
  const reviewCount = Math.floor(Math.random() * 2000) + 10; // 10 - 2010 reviews
  const stockQuantity = Math.floor(Math.random() * 100) + 5; // 5 - 105 stock

  return {
    id,
    sku: `${brand.toUpperCase().slice(0, 3)}-${selectedCategory
      .toUpperCase()
      .slice(0, 3)}-${id.padStart(4, '0')}`,
    name,
    description,
    price,
    originalPrice,
    images,
    category: category.name,
    subcategory,
    brand,
    rating,
    reviewCount,
    inStock: stockQuantity > 0,
    stockQuantity,
    tags,
    specifications: specs,
    createdAt: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toISOString(), // Random date within last year
    updatedAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(), // Random date within last month
  };
};

// Generate multiple products
export const generateProducts = (count: number): Product[] => {
  const products: Product[] = [];
  const categories = Object.keys(TECH_CATEGORIES);

  for (let i = 1; i <= count; i++) {
    // Distribute products across categories roughly evenly
    const categoryIndex = Math.floor(
      (i - 1) / Math.ceil(count / categories.length)
    );
    const categoryKey = categories[categoryIndex % categories.length];

    const product = generateProduct(i.toString(), categoryKey);
    products.push(product);
  }

  return products;
};

// Generate the full 1000 products dataset
export const MOCK_PRODUCTS = generateProducts(1000);
