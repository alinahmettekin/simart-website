"use client";

import { useCartStore } from "@/stores/cartStore";

export default function CartLength() {
  // Selector kullanarak sadece items değiştiğinde re-render olur
  const totalItems = useCartStore((state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  });
  return <>{totalItems}</>;
}
