import Link from "next/link";
import Image from "next/image";
import type { Item } from "@/lib/type";

interface MenuItemProps {
  item: Item;
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <Link href={`/menu/${item.id}`} className="group">
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg?height=200&width=300"}
            alt={item.name}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
            <span className="text-amber-600 font-bold">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
