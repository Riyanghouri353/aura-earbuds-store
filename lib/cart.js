"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS, ACCESSORIES } from "./products";

const CartCtx = createContext(null);
export const ALL_ITEMS = [...PRODUCTS, ...ACCESSORIES];

export function CartProvider({ children }) {
  const [items, setItems] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("aura-cart") || "{}");
      if (saved && typeof saved === "object") setItems(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("aura-cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const add = (slug, color) => {
    const key = color ? `${slug}__${color}` : slug;
    setItems((s) => ({ ...s, [key]: { slug, color: color || null, qty: (s[key]?.qty || 0) + 1 } }));
    setOpen(true);
  };
  const setQty = (key, qty) =>
    setItems((s) => {
      const next = { ...s };
      if (qty <= 0) delete next[key]; else next[key] = { ...next[key], qty };
      return next;
    });
  const remove = (key) => setQty(key, 0);
  const clear = () => setItems({});

  const lines = useMemo(() =>
    Object.entries(items).map(([key, v]) => {
      const item = ALL_ITEMS.find((p) => p.slug === v.slug);
      return item ? { key, item, color: v.color, qty: v.qty, total: item.price * v.qty } : null;
    }).filter(Boolean), [items]);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + l.total, 0);

  return (
    <CartCtx.Provider value={{ lines, count, subtotal, add, setQty, remove, clear, open, setOpen }}>
      {children}
    </CartCtx.Provider>
  );
}
export const useCart = () => useContext(CartCtx);
