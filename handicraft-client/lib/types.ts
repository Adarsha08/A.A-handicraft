export interface Product {
  id: string
  name: string
  category: any
  price: number
  description: string
  image: string[]
  stock: number
  isBestSeller: boolean
  isExportQuality: boolean
  createdAt?: string
  material:string
  culturalSignificance:string
  updatedAt?: string
}

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