export interface Size {
  id: string
  name: string
  price: number
}

export interface Option {
  id: string
  name: string
  price: number
}

export interface Item {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  sizes?: Size[]
  options?: Option[]
}

export interface Category {
  id: string
  name: string
  items: Item[]
}

export interface CartItemType extends Item {
  quantity: number
  selectedOptions?: string[]
}
