"use client";

import { useState } from "react";
import Link from "next/link";

import { useCart } from "@/src/components/hooks-use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { CartItem } from "@/src/components/cart-item";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitOrder = async () => {
    if (!customerName || !tableNumber) {
      setError("Please provide your name and table number");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              Order Placed Successfully!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Thank you, {customerName}. Your order has been received and will
              be prepared shortly.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600"
              >
                Return to Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            <Link
              href="/"
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some delicious items from our menu to get started.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.selectedOptions?.join("-")}`}
                      item={item}
                      onRemove={() => removeItem(item.id, item.selectedOptions)}
                      onUpdateQuantity={(qty) =>
                        updateQuantity(item.id, qty, item.selectedOptions)
                      }
                    />
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="mb-4">
                  <div className="flex justify-between py-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between py-2 text-base font-medium text-gray-900 border-t border-gray-200 mt-2 pt-2">
                    <p>Total</p>
                    <p className="font-bold">${total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="table">Table Number</Label>
                    <Input
                      id="table"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Enter your table number"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special requests or allergies?"
                      className="mt-1"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
