"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/components/hooks-use-cart";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { findItemById } from "@/lib/data-menu";
import { ChevronLeft, Plus, Minus } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function MenuItemPage({ params }: PageProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const item = findItemById(params.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    item?.sizes?.length ? item.sizes[0].id : ""
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Item not found
          </h1>
          <Link
            href="/"
            className="text-amber-600 hover:text-amber-800 font-medium"
          >
            Return to menu
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const options = selectedSize
      ? [selectedSize, ...selectedOptions]
      : selectedOptions;

    addItem({
      ...item,
      quantity,
      selectedOptions: options,
    });

    router.push("/cart");
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  let totalPrice = item.price;

  if (selectedSize && item.sizes) {
    const selectedSizeObj = item.sizes.find((size) => size.id === selectedSize);
    if (selectedSizeObj) {
      totalPrice = selectedSizeObj.price;
    }
  }

  if (selectedOptions.length > 0 && item.options) {
    item.options.forEach((option) => {
      if (selectedOptions.includes(option.id)) {
        totalPrice += option.price;
      }
    });
  }

  totalPrice *= quantity;

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-80 md:h-96 overflow-hidden rounded-lg">
            <Image
              src={item.image || "/placeholder.svg?height=400&width=600"}
              alt={item.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="text-2xl font-bold text-amber-600">
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            <div className="space-y-6">
              {item.sizes && item.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Size
                  </h3>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                  >
                    <div className="space-y-2">
                      {item.sizes.map((size) => (
                        <div
                          key={size.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={size.id}
                            id={`size-${size.id}`}
                          />
                          <Label
                            htmlFor={`size-${size.id}`}
                            className="flex justify-between w-full"
                          >
                            <span>{size.name}</span>
                            <span>${size.price.toFixed(2)}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {item.options && item.options.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Options
                  </h3>
                  <div className="space-y-2">
                    {item.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`option-${option.id}`}
                          checked={selectedOptions.includes(option.id)}
                          onCheckedChange={() => handleOptionToggle(option.id)}
                        />
                        <Label
                          htmlFor={`option-${option.id}`}
                          className="flex justify-between w-full"
                        >
                          <span>{option.name}</span>
                          <span>+${option.price.toFixed(2)}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="p-2 border rounded-l-md"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="px-4 py-2 border-t border-b text-center min-w-[60px]">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="p-2 border rounded-r-md"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-amber-500 hover:bg-amber-600"
              >
                Add to Cart - ${totalPrice.toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
