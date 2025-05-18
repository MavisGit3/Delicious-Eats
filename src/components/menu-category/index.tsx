import type { Category } from "@/lib/type";
import { MenuItem } from "../menu-item";

interface MenuCategoryProps {
  category: Category;
}

export function MenuCategory({ category }: MenuCategoryProps) {
  return (
    <section id={`category-${category.id}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
