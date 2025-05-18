import Link from "next/link";
import { MenuCategory } from "@/src/components/menu-category";
import { categories } from "@/lib/data-menu";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Delicious Eats</h1>
            <Link
              href="/cart"
              className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 ">
            {" "}
            <span className="test border-b-2 border-amber-600">Our Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our delicious offerings, made with the freshest ingredients
            and prepared with care.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <MenuCategory key={category.id} category={category} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Delicious Eats. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
