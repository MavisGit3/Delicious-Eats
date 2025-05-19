import type { Category, Item, Size, Option } from "./type";

export const categories: Category[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    items: [
      {
        id: "app1",
        name: "Garlic Bread",
        description: "Freshly baked bread with garlic butter and herbs.",
        price: 5.99,
        category: "appetizers",
        image: "/images/aaptiz bread.jpg",
      },
      {
        id: "app2",
        name: "Mozzarella Sticks",
        description: "Golden fried mozzarella sticks served with marinara.",
        price: 7.99,
        category: "appetizers",
        image: "/images/apptiz m-stick.jpg",
      },
      {
        id: "app3",
        name: "Chicken Wings",
        description: "Crispy chicken wings tossed in your choice of sauce.",
        price: 9.99,
        category: "appetizers",
        image: "/images/apptiz chekn wing.jpg",
        options: [
          { id: "wing-buffalo", name: "Buffalo Sauce", price: 0 },
          { id: "wing-bbq", name: "BBQ Sauce", price: 0 },
          { id: "wing-garlic", name: "Garlic Parmesan", price: 0.5 },
        ],
      },
    ],
  },
  {
    id: "main-courses",
    name: "Main Courses",
    items: [
      {
        id: "main1",
        name: "Classic Burger",
        description:
          "Juicy beef patty with lettuce, tomato, onion, and our special sauce on a brioche bun.",
        price: 12.99,
        category: "main-courses",
        image: "/images/apptiz burger.jpg",
      },
      {
        id: "main2",
        name: "Margherita Pizza",
        description:
          "Traditional pizza with tomato sauce, fresh mozzarella, and basil.",
        price: 14.99,
        category: "main-courses",
        image: "/images/apptiz pizza.jpg",
        sizes: [
          { id: "pizza-small", name: 'Small (10")', price: 14.99 },
          { id: "pizza-medium", name: 'Medium (14")', price: 18.99 },
          { id: "pizza-large", name: 'Large (18")', price: 22.99 },
        ],
      },
      {
        id: "main3",
        name: "Grilled Salmon",
        description:
          "Fresh salmon fillet grilled to perfection, served with seasonal vegetables and rice.",
        price: 18.99,
        category: "main-courses",
        image: "/images/apptiz grilled.jpg",
      },
      {
        id: "main4",
        name: "Pasta Alfredo",
        description:
          "Fettuccine pasta in a creamy Alfredo sauce with parmesan cheese.",
        price: 13.99,
        category: "main-courses",
        image: "/images/apptiz chesecake.jpg ",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        id: "dessert1",
        name: "Tiramisu",
        description:
          "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
        price: 7.99,
        category: "desserts",
        image: "/images/cake-1.jpg",
      },
      {
        id: "dessert2",
        name: "Cheesecake",
        description:
          "Creamy New York style cheesecake with a graham cracker crust and berry compote.",
        price: 6.99,
        category: "desserts",
        image: "/images/premium-cake.jpg ",
      },
      {
        id: "dessert3",
        name: "Chocolate Lava Cake",
        description:
          "Warm chocolate cake with a molten center, served with vanilla ice cream.",
        price: 8.99,
        category: "desserts",
        image: "/images/oreo-cheesecake.jpg ",
      },
    ],
  },
  {
    id: "special-dishes",
    name: "Special Dishes",
    items: [
      {
        id: "special1",
        name: "Fried Chicken",
        description: "Crispy fried chicken slices mixed with bell pepper.",
        price: 14.99,
        category: "special-dishes",
        image: "/images/fried-chicken.jpg",
      },
      {
        id: "special2",
        name: "Tortilla Wraps",
        description: "Tortilla wraps with meat and fresh vegetables.",
        price: 12.99,
        category: "special-dishes",
        image: "/images/tortilla-wraps-with-meat-fresh-vegetables.jpg ",
        options: [
          { id: "wrap-beef", name: "Beef", price: 0 },
          { id: "wrap-chicken", name: "Chicken", price: 0 },
        ],
      },
      {
        id: "special3",
        name: "Falafel Plate",
        description:
          "Falafel with hummus and pita, traditional Middle Eastern dish.",
        price: 11.49,
        category: "special-dishes",
        image: "/images/farabic-dishes.jpg ",
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      {
        id: "bev1",
        name: "Soft Drinks",
        description: "Your choice of cola, lemon-lime, or root beer.",
        price: 2.99,
        category: "beverages",
        image: "/images/premium_photo.jpg ",
      },
      {
        id: "bev2",
        name: "Iced Tea",
        description: "Freshly brewed iced tea.",
        price: 2.99,
        category: "beverages",
        image: "/images/iced-tea.jpg ",
        options: [
          { id: "tea-sweet", name: "Sweet", price: 0 },
          { id: "tea-unsweet", name: "Unsweet", price: 0 },
        ],
      },
      {
        id: "bev3",
        name: "Coffee",
        description: "Premium coffee, served cold.",
        price: 2.49,
        category: "beverages",
        image: "/images/iced-coffee.jpg ",
      },
    ],
  },
];

export function findItemById(id: string): Item | undefined {
  for (const category of categories) {
    const item = category.items.find((item) => item.id === id);
    if (item) return item;
  }
  return undefined;
}

export function findSizeById(itemId: string, sizeId: string): Size | undefined {
  const item = findItemById(itemId);
  return item?.sizes?.find((size) => size.id === sizeId);
}

export function findOptionById(
  itemId: string,
  optionId: string
): Option | undefined {
  const item = findItemById(itemId);
  return item?.options?.find((option) => option.id === optionId);
}
