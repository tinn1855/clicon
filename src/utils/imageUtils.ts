/**
 * Image utilities for better image URLs and fallbacks
 */

// High-quality fallback images from Unsplash
export const FALLBACK_IMAGES = {
  // Technology categories
  laptop:
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
  smartphone:
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
  headphones:
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
  camera:
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
  gaming:
    'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
  smartwatch:
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
  tablet:
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
  accessories:
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop&crop=center&auto=format&q=80',

  // Generic tech fallback
  default:
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop&crop=center&auto=format&q=80',

  // Product placeholder
  placeholder:
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=800&fit=crop&crop=center&auto=format&q=80',

  // Hero/banner images
  hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
  banner:
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop&crop=center&auto=format&q=80',
};

// Enhanced image URLs with better quality and optimization
export const ENHANCED_PRODUCT_IMAGES = {
  // Keyboards
  keyboards: [
    'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Mice
  mice: [
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1612198473297-d8e6a00b44f4?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Monitors
  monitors: [
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Webcams
  webcams: [
    'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1616788494672-ec8b6fe1e4a9?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Speakers
  speakers: [
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Laptops & Computers
  laptops: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Smartphones
  smartphones: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1525598912003-663126343e1f?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1607936854279-55e8f4bc192c?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1610792516307-6b4b6fa2b866?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Headphones & Audio
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Cameras
  cameras: [
    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1616788494672-ec8b6fe1e4a9?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1520637836862-4d197d17c52a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Gaming
  gaming: [
    'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Smart Home & IoT
  smartHome: [
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Tablets
  tablets: [
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1509390144516-be4c86b92d2a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Accessories
  accessories: [
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1590844996442-d66c718eee93?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1515330371514-37a94baa2f8a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],

  // Drones & Tech
  drones: [
    'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
    'https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?w=800&h=800&fit=crop&crop=center&auto=format&q=85',
  ],
};

/**
 * Get optimized image URL with size and quality parameters
 */
export function optimizeImageUrl(
  url: string,
  width = 800,
  height = 800,
  quality = 85
): string {
  if (url.includes('unsplash.com')) {
    // Add or update Unsplash optimization parameters
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&crop=center&auto=format&q=${quality}`;
  }

  // For other image services, return as-is
  return url;
}

/**
 * Get category-specific fallback image
 */
export function getCategoryFallback(category: string): string {
  const normalizedCategory = category.toLowerCase();

  if (
    normalizedCategory.includes('keyboard') ||
    normalizedCategory.includes('key')
  ) {
    return 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop&crop=center&auto=format&q=80';
  }
  if (
    normalizedCategory.includes('mouse') ||
    normalizedCategory.includes('mice')
  ) {
    return 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&crop=center&auto=format&q=80';
  }
  if (
    normalizedCategory.includes('monitor') ||
    normalizedCategory.includes('display')
  ) {
    return 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&crop=center&auto=format&q=80';
  }
  if (
    normalizedCategory.includes('webcam') ||
    normalizedCategory.includes('camera')
  ) {
    return 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&h=800&fit=crop&crop=center&auto=format&q=80';
  }
  if (
    normalizedCategory.includes('speaker') ||
    normalizedCategory.includes('sound')
  ) {
    return 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop&crop=center&auto=format&q=80';
  }
  if (
    normalizedCategory.includes('laptop') ||
    normalizedCategory.includes('computer')
  ) {
    return FALLBACK_IMAGES.laptop;
  }
  if (
    normalizedCategory.includes('phone') ||
    normalizedCategory.includes('smartphone')
  ) {
    return FALLBACK_IMAGES.smartphone;
  }
  if (
    normalizedCategory.includes('headphone') ||
    normalizedCategory.includes('audio')
  ) {
    return FALLBACK_IMAGES.headphones;
  }
  if (
    normalizedCategory.includes('camera') ||
    normalizedCategory.includes('photo')
  ) {
    return FALLBACK_IMAGES.camera;
  }
  if (
    normalizedCategory.includes('gaming') ||
    normalizedCategory.includes('game')
  ) {
    return FALLBACK_IMAGES.gaming;
  }
  if (
    normalizedCategory.includes('watch') ||
    normalizedCategory.includes('smart')
  ) {
    return FALLBACK_IMAGES.smartwatch;
  }
  if (
    normalizedCategory.includes('tablet') ||
    normalizedCategory.includes('pad')
  ) {
    return FALLBACK_IMAGES.tablet;
  }
  if (
    normalizedCategory.includes('accessory') ||
    normalizedCategory.includes('accessories')
  ) {
    return FALLBACK_IMAGES.accessories;
  }

  return FALLBACK_IMAGES.default;
}

/**
 * Get multiple images for a product based on category
 */
export function getCategoryImages(category: string, count = 3): string[] {
  const normalizedCategory = category.toLowerCase();
  let imagePool: string[] = [];

  if (
    normalizedCategory.includes('keyboard') ||
    normalizedCategory.includes('key')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.keyboards;
  } else if (
    normalizedCategory.includes('mouse') ||
    normalizedCategory.includes('mice')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.mice;
  } else if (
    normalizedCategory.includes('monitor') ||
    normalizedCategory.includes('display')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.monitors;
  } else if (normalizedCategory.includes('webcam')) {
    imagePool = ENHANCED_PRODUCT_IMAGES.webcams;
  } else if (
    normalizedCategory.includes('speaker') ||
    normalizedCategory.includes('sound')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.speakers;
  } else if (
    normalizedCategory.includes('laptop') ||
    normalizedCategory.includes('computer')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.laptops;
  } else if (
    normalizedCategory.includes('phone') ||
    normalizedCategory.includes('smartphone')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.smartphones;
  } else if (
    normalizedCategory.includes('headphone') ||
    normalizedCategory.includes('audio')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.headphones;
  } else if (
    normalizedCategory.includes('camera') ||
    normalizedCategory.includes('photo')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.cameras;
  } else if (
    normalizedCategory.includes('gaming') ||
    normalizedCategory.includes('game')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.gaming;
  } else if (
    normalizedCategory.includes('smart') ||
    normalizedCategory.includes('iot')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.smartHome;
  } else if (
    normalizedCategory.includes('tablet') ||
    normalizedCategory.includes('pad')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.tablets;
  } else if (
    normalizedCategory.includes('drone') ||
    normalizedCategory.includes('uav')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.drones;
  } else {
    imagePool = ENHANCED_PRODUCT_IMAGES.accessories;
  }

  // Shuffle and return requested count
  const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Generate unique image set for a specific product
 */
export function getUniqueProductImages(
  productId: string,
  category: string,
  imageCount = 4
): string[] {
  const normalizedCategory = category.toLowerCase();
  let imagePool: string[] = [];

  // Get category-specific image pool
  if (
    normalizedCategory.includes('keyboard') ||
    normalizedCategory.includes('key')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.keyboards;
  } else if (
    normalizedCategory.includes('mouse') ||
    normalizedCategory.includes('mice')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.mice;
  } else if (
    normalizedCategory.includes('monitor') ||
    normalizedCategory.includes('display')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.monitors;
  } else if (normalizedCategory.includes('webcam')) {
    imagePool = ENHANCED_PRODUCT_IMAGES.webcams;
  } else if (
    normalizedCategory.includes('speaker') ||
    normalizedCategory.includes('sound')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.speakers;
  } else if (
    normalizedCategory.includes('laptop') ||
    normalizedCategory.includes('computer')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.laptops;
  } else if (
    normalizedCategory.includes('phone') ||
    normalizedCategory.includes('smartphone')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.smartphones;
  } else if (
    normalizedCategory.includes('headphone') ||
    normalizedCategory.includes('audio')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.headphones;
  } else if (
    normalizedCategory.includes('camera') ||
    normalizedCategory.includes('photo')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.cameras;
  } else if (
    normalizedCategory.includes('gaming') ||
    normalizedCategory.includes('game')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.gaming;
  } else if (
    normalizedCategory.includes('smart') ||
    normalizedCategory.includes('iot')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.smartHome;
  } else if (
    normalizedCategory.includes('tablet') ||
    normalizedCategory.includes('pad')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.tablets;
  } else if (
    normalizedCategory.includes('drone') ||
    normalizedCategory.includes('uav')
  ) {
    imagePool = ENHANCED_PRODUCT_IMAGES.drones;
  } else {
    imagePool = ENHANCED_PRODUCT_IMAGES.accessories;
  }

  const uniqueImages: string[] = [];

  // Use product ID to create consistent but unique selection
  const seed = hashString(productId);

  // Generate multiple images for the product
  for (let i = 0; i < Math.min(imageCount, imagePool.length); i++) {
    const imageIndex = (seed + i) % imagePool.length;
    uniqueImages.push(imagePool[imageIndex]);
  }

  // If we need more images than available, generate variations
  if (imageCount > imagePool.length) {
    const additionalCount = imageCount - imagePool.length;
    for (let i = 0; i < additionalCount; i++) {
      const baseIndex = i % imagePool.length;
      const variation = optimizeImageUrl(
        imagePool[baseIndex],
        800 + i * 50, // Slightly different sizes
        800 + i * 50,
        85 + i * 2 // Slightly different quality
      );
      uniqueImages.push(variation);
    }
  }

  return uniqueImages;
}

/**
 * Get main product image (first image from unique set)
 */
export function getMainProductImage(
  productId: string,
  category: string
): string {
  const images = getUniqueProductImages(productId, category, 1);
  return images[0];
}

/**
 * Get thumbnail images for product gallery
 */
export function getProductThumbnails(
  productId: string,
  category: string,
  count = 3
): string[] {
  const images = getUniqueProductImages(productId, category, count + 1);
  return images.slice(1); // Skip main image, return thumbnails
}

/**
 * Simple hash function to generate consistent seeds from product ID
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
