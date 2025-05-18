"use client";

import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { findItemById, findOptionById, findSizeById } from "@/lib/data-menu";
import type { CartItemType } from "@/lib/type";

interface OptionDetail {
  name: string;
  price: number;
}

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const menuItem = findItemById(item.id);

  if (!menuItem) return null;

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    onUpdateQuantity(item.quantity + 1);
  };

  // Get selected options details with proper typing
  const selectedOptionsDetails: OptionDetail[] =
    item.selectedOptions
      ?.map((optionId) => {
        if (menuItem.sizes) {
          const size = findSizeById(menuItem.id, optionId);
          if (size) return { name: size.name, price: size.price };
        }

        // check if it's an option
        if (menuItem.options) {
          const option = findOptionById(menuItem.id, optionId);
          if (option) return { name: option.name, price: option.price };
        }

        return null;
      })
      .filter((item): item is OptionDetail => item !== null) || [];

  // Calculate item total price
  let itemPrice = item.price;

  if (selectedOptionsDetails && selectedOptionsDetails.length > 0) {
    const firstOption = selectedOptionsDetails[0];
    if (
      menuItem.sizes &&
      menuItem.sizes.some((s) => s.name === firstOption.name)
    ) {
      itemPrice = firstOption.price;

      // Add other options
      for (let i = 1; i < selectedOptionsDetails.length; i++) {
        itemPrice += selectedOptionsDetails[i].price;
      }
    } else {
      selectedOptionsDetails.forEach((option) => {
        itemPrice += option.price;
      });
    }
  }

  const totalPrice = itemPrice * item.quantity;

  return (
    <li className="py-6 px-4">
      <div className="flex items-center">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
          <Image
            src={menuItem.image || "/placeholder.svg?height=80&width=80"}
            alt={menuItem.name}
            className="object-cover object-center"
            fill
            sizes="80px"
          />
        </div>

        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">
                {menuItem.name}
              </h3>
              {selectedOptionsDetails && selectedOptionsDetails.length > 0 && (
                <div className="mt-1">
                  {selectedOptionsDetails.map((option, index) => (
                    <span key={index} className="text-sm text-gray-500">
                      {option.name}
                      {index < selectedOptionsDetails.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-base font-medium text-gray-900">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border rounded-md">
              <button type="button" onClick={decreaseQuantity} className="p-1">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-2 py-1 text-sm">{item.quantity}</span>
              <button type="button" onClick={increaseQuantity} className="p-1">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="text-sm text-red-600 hover:text-red-800 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
