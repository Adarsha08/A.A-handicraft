// types.ts

export type Product = {
  id: string
  name: string
  category: string
  price: number
  material: string
  description: string
  culturalSignificance: string
  images: string[]
  stock: number
  rating: number
  isBestSeller: boolean
  isExportQuality: boolean
  createdAt?: string
  updatedAt?: string
}

// Use this wherever you need a default/empty product object
export const defaultProduct = (): Product => ({
  id: "",
  name: "",
  category: "",
  price: 0,
  material: "",
  description: "",
  culturalSignificance: "",
  images: [],
  stock: 0,
  rating: 0,
  isBestSeller: false,
  isExportQuality: false,
})

export const CATEGORIES = [
  "Religious & Spiritual",
  "Jewelry",
  "Wooden Crafts",
  "Stone & Metal Crafts",
  "Textile & Fabric",
  "Souvenirs"
]

export const MATERIALS = [
  "Metal", "Wood", "Stone", "Fabric", "Silver", "Gold Plated", "Copper", "Gemstone"
]

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'p1',
    name: 'Buddhist Prayer Wheel',
    category: 'Religious & Spiritual',
    price: 120,
    material: 'Metal',
    description: 'Handcrafted prayer wheel with intricate detailing.',
    culturalSignificance: 'A symbol of devotion and mindful practice.',
    images: ['/file.svg'],
    stock: 10,
    rating: 4.7,
    isBestSeller: true,
    isExportQuality: true,
  },
  {
    id: 'p2',
    name: 'Himalayan Stone Incense Holder',
    category: 'Stone & Metal Crafts',
    price: 65,
    material: 'Stone',
    description: 'Sturdy incense holder made from locally sourced stone.',
    culturalSignificance: 'Used in daily rituals to cleanse the space.',
    images: ['/file.svg'],
    stock: 8,
    rating: 4.5,
    isBestSeller: false,
    isExportQuality: true,
  },
  {
    id: 'p3',
    name: 'Wooden Carved Mala Stand',
    category: 'Wooden Crafts',
    price: 90,
    material: 'Wood',
    description: 'A handcrafted wooden stand for malas and prayer items.',
    culturalSignificance: 'Supports calm meditation and respectful storage.',
    images: ['/file.svg'],
    stock: 6,
    rating: 4.6,
    isBestSeller: true,
    isExportQuality: true,
  },
]

