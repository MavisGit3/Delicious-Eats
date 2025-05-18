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
        image: "/images/aaptiz bread.img",
      },
      {
        id: "app2",
        name: "Mozzarella Sticks",
        description: "Golden fried mozzarella sticks served with marinara.",
        price: 7.99,
        category: "appetizers",
        image: "/images/apptiz m-stick.img",
      },
      {
        id: "app3",
        name: "Chicken Wings",
        description: "Crispy chicken wings tossed in your choice of sauce.",
        price: 9.99,
        category: "appetizers",
        image: "/images/apptiz chekn wing.img",
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
        image: "/images/apptiz burger.img",
      },
      {
        id: "main2",
        name: "Margherita Pizza",
        description:
          "Traditional pizza with tomato sauce, fresh mozzarella, and basil.",
        price: 14.99,
        category: "main-courses",
        image: "/images/apptiz pizza.img",
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
        image: "/images/apptiz grilled.img",
      },
      {
        id: "main4",
        name: "Pasta Alfredo",
        description:
          "Fettuccine pasta in a creamy Alfredo sauce with parmesan cheese.",
        price: 13.99,
        category: "main-courses",
        image: "/images/apptiz pasta.img",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        id: "dessert1",
        name: "Roasted Chicken",
        description:
          "roasted chicken wings with herbs well served with vegetables.",
        price: 7.99,
        category: "desserts",
        image: "/images/apptiz tiramis.img",
      },
      {
        id: "dessert2",
        name: "Club Sandwich",
        description:
          "club sandwich with cheese cucumber tomato smoked salami served with french fries.",
        price: 6.99,
        category: "desserts",
        image: "/images/apptiz chesecake.img",
      },
      {
        id: "dessert3",
        name: "Crumbed Fish",
        description:
          "close crumbed fish sticks served white plate with lemon lettuce leaves tomatosauce vert.",
        price: 8.99,
        category: "desserts",
        image: "/images/apptiz crumbed-fish-sticks.img ",
      },
    ],
  },
  {
    id: "beverages",
    name: "Special Dishes",
    items: [
      {
        id: "bev1",
        name: "Fried Chicken",
        description: "fried chicken slices mixed with bell pepper.",
        price: 2.99,
        category: "beverages",
        image: "/images/fried-chicken.avif",
      },
      {
        id: "bev2",
        name: "Tortilla",
        description: "tortilla wraps with meat fresh vegetables.",
        price: 2.99,
        category: "beverages",
        image: "/images/tortilla-wraps-with-meat-fresh-vegetables.avif",
        options: [
          { id: "tea-sweet", name: "Sweet", price: 0 },
          { id: "tea-unsweet", name: "Unsweet", price: 0 },
        ],
      },
      {
        id: "bev3",
        name: "Falafel",
        description: "falafel hummus pita middle eastern arabic dishes.",
        price: 2.49,
        category: "beverages",
        image: "/images/farabic-dishes.avif",
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
