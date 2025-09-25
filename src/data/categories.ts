// Technology product categories with detailed specifications
export const TECH_CATEGORIES = {
  keyboards: {
    name: 'Keyboards',
    subcategories: ['Mechanical', 'Wireless', 'Gaming', 'Ergonomic', 'Compact'],
    brands: [
      'Logitech',
      'Corsair',
      'Razer',
      'SteelSeries',
      'Keychron',
      'Ducky',
      'HyperX',
      'ASUS ROG',
    ],
    specs: {
      switchType: [
        'Cherry MX Blue',
        'Cherry MX Red',
        'Cherry MX Brown',
        'Gateron Blue',
        'Gateron Red',
        'Romer-G',
      ],
      connectivity: [
        'USB-C',
        'USB-A',
        'Wireless 2.4GHz',
        'Bluetooth',
        'USB + Wireless',
      ],
      backlight: ['RGB', 'Single Color', 'No Backlight'],
      layout: ['Full Size', 'TKL', '60%', '65%', '75%'],
    },
  },
  mice: {
    name: 'Mice',
    subcategories: ['Gaming', 'Wireless', 'Ergonomic', 'Vertical', 'Travel'],
    brands: [
      'Logitech',
      'Razer',
      'SteelSeries',
      'Corsair',
      'HyperX',
      'Roccat',
      'Zowie',
      'Glorious',
    ],
    specs: {
      dpi: ['800-3200', '1000-6400', '3200-12000', '6400-20000', '12000-25600'],
      connectivity: ['USB', 'Wireless 2.4GHz', 'Bluetooth', 'USB + Wireless'],
      sensor: ['Optical', 'Laser', 'PixArt 3310', 'PixArt 3360', 'Hero 25K'],
      weight: [
        'Ultra Light (<70g)',
        'Light (70-90g)',
        'Medium (90-110g)',
        'Heavy (>110g)',
      ],
    },
  },
  laptops: {
    name: 'Laptops',
    subcategories: ['Gaming', 'Business', 'Ultrabook', 'Workstation', '2-in-1'],
    brands: [
      'Dell',
      'HP',
      'Lenovo',
      'ASUS',
      'Acer',
      'MSI',
      'Razer',
      'Apple',
      'Microsoft',
    ],
    specs: {
      processor: [
        'Intel i3',
        'Intel i5',
        'Intel i7',
        'Intel i9',
        'AMD Ryzen 5',
        'AMD Ryzen 7',
        'AMD Ryzen 9',
        'Apple M1',
        'Apple M2',
      ],
      ram: ['8GB', '16GB', '32GB', '64GB'],
      storage: [
        '256GB SSD',
        '512GB SSD',
        '1TB SSD',
        '2TB SSD',
        '1TB HDD + 256GB SSD',
      ],
      display: ['13.3"', '14"', '15.6"', '17.3"', '4K', 'FHD', 'QHD', 'OLED'],
      graphics: [
        'Integrated',
        'GTX 1650',
        'RTX 3060',
        'RTX 3070',
        'RTX 3080',
        'RTX 4060',
        'RTX 4070',
        'RTX 4080',
      ],
    },
  },
  monitors: {
    name: 'Monitors',
    subcategories: ['Gaming', '4K', 'Ultrawide', 'Professional', 'Budget'],
    brands: [
      'Samsung',
      'LG',
      'Dell',
      'ASUS',
      'Acer',
      'BenQ',
      'AOC',
      'MSI',
      'ViewSonic',
    ],
    specs: {
      size: ['21.5"', '24"', '27"', '32"', '34"', '38"', '43"', '49"'],
      resolution: [
        '1920x1080',
        '2560x1440',
        '3840x2160',
        '2560x1080',
        '3440x1440',
        '5120x1440',
      ],
      refreshRate: ['60Hz', '75Hz', '144Hz', '165Hz', '240Hz', '360Hz'],
      panel: ['IPS', 'VA', 'TN', 'OLED', 'QLED'],
      features: [
        'G-Sync',
        'FreeSync',
        'HDR400',
        'HDR600',
        'HDR1000',
        'USB-C Hub',
      ],
    },
  },
  headphones: {
    name: 'Headphones',
    subcategories: [
      'Gaming',
      'Wireless',
      'Studio',
      'Earbuds',
      'Noise Canceling',
    ],
    brands: [
      'Sony',
      'Bose',
      'Audio-Technica',
      'Sennheiser',
      'SteelSeries',
      'HyperX',
      'Razer',
      'Logitech',
      'Apple',
    ],
    specs: {
      type: ['Over-ear', 'On-ear', 'In-ear', 'True Wireless'],
      connectivity: [
        '3.5mm Jack',
        'USB',
        'Wireless 2.4GHz',
        'Bluetooth 5.0',
        'Bluetooth 5.2',
      ],
      features: [
        'Active Noise Canceling',
        'Surround Sound',
        'RGB Lighting',
        'Detachable Mic',
        'Wireless Charging',
      ],
      driverSize: ['40mm', '50mm', '53mm', '6mm', '10mm', '13mm'],
    },
  },
  webcams: {
    name: 'Webcams',
    subcategories: ['4K', '1080p', 'Streaming', 'Conference', 'Budget'],
    brands: ['Logitech', 'Razer', 'Microsoft', 'Creative', 'OBSBOT', 'Elgato'],
    specs: {
      resolution: ['720p', '1080p', '1440p', '4K'],
      frameRate: ['30fps', '60fps', '90fps'],
      features: [
        'Auto Focus',
        'HDR',
        'Background Blur',
        'AI Tracking',
        'Privacy Cover',
      ],
      fieldOfView: ['65°', '78°', '90°', '110°'],
    },
  },
  speakers: {
    name: 'Speakers',
    subcategories: [
      'Desktop',
      'Bluetooth',
      'Gaming',
      '2.1 System',
      'Soundbars',
    ],
    brands: [
      'Logitech',
      'Creative',
      'Razer',
      'JBL',
      'Bose',
      'Edifier',
      'Klipsch',
      'Audioengine',
    ],
    specs: {
      power: ['10W', '20W', '40W', '80W', '120W', '200W+'],
      connectivity: ['3.5mm', 'USB', 'Bluetooth', 'Optical', 'RCA'],
      channels: ['2.0', '2.1', '5.1', '7.1'],
      features: [
        'RGB Lighting',
        'Remote Control',
        'EQ Settings',
        'Voice Assistant',
      ],
    },
  },
  tablets: {
    name: 'Tablets',
    subcategories: ['iPad', 'Android', 'Windows', 'Drawing', 'Budget'],
    brands: ['Apple', 'Samsung', 'Microsoft', 'Huawei', 'Amazon', 'Lenovo'],
    specs: {
      screenSize: ['7"', '8"', '10.1"', '10.9"', '11"', '12.4"', '12.9"'],
      storage: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'],
      connectivity: ['Wi-Fi', 'Wi-Fi + Cellular', '5G'],
      features: [
        'Stylus Support',
        'Keyboard Compatible',
        'Face ID',
        'Fingerprint Scanner',
      ],
    },
  },
  accessories: {
    name: 'Accessories',
    subcategories: ['Mouse Pads', 'USB Hubs', 'Cables', 'Stands', 'Cleaning'],
    brands: [
      'Anker',
      'Belkin',
      'HyperX',
      'Corsair',
      'Razer',
      'SteelSeries',
      'Generic',
    ],
    specs: {
      material: [
        'Cloth',
        'Hard Plastic',
        'Aluminum',
        'Tempered Glass',
        'Rubber',
      ],
      features: [
        'RGB Lighting',
        'Wireless Charging',
        'USB-C PD',
        'Data Transfer',
        'Adjustable',
      ],
    },
  },
} as const;

// Price ranges for different categories (in USD)
export const CATEGORY_PRICE_RANGES = {
  keyboards: { min: 25, max: 300 },
  mice: { min: 15, max: 180 },
  laptops: { min: 400, max: 4000 },
  monitors: { min: 120, max: 2000 },
  headphones: { min: 20, max: 500 },
  webcams: { min: 30, max: 300 },
  speakers: { min: 25, max: 800 },
  tablets: { min: 100, max: 1500 },
  accessories: { min: 10, max: 200 },
} as const;

// Discount patterns
export const DISCOUNT_PATTERNS = [
  { probability: 0.7, discount: 0 }, // 70% no discount
  { probability: 0.15, discount: 0.1 }, // 15% get 10% off
  { probability: 0.08, discount: 0.15 }, // 8% get 15% off
  { probability: 0.05, discount: 0.2 }, // 5% get 20% off
  { probability: 0.015, discount: 0.25 }, // 1.5% get 25% off
  { probability: 0.005, discount: 0.3 }, // 0.5% get 30% off
] as const;

// Product tags
export const PRODUCT_TAGS = [
  'new',
  'bestseller',
  'featured',
  'sale',
  'limited',
  'rgb',
  'wireless',
  'gaming',
  'professional',
  'budget',
  'premium',
  'eco-friendly',
] as const;
