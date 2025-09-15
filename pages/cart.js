import { useState, useEffect } from "react";
import Link from "next/link";
export default function Cart() {
  const [items, setItems] = useState([]);
  useEffect(
    () => setItems(JSON.parse(localStorage.getItem("cart") || "[]")),
    []
  );
  const remove = (i) => {
    const newItems = items.filter((_, idx) => idx !== i);
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };
  return (
    <div style={{ padding: 20 }}>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {items.map((it, idx) => (
            <div
              key={idx}
              style={{ borderBottom: "1px solid #ddd", padding: 10 }}
            >
              <strong>{it.product.name}</strong> — {it.quantity} × £
              {it.product.price}
              <button onClick={() => remove(idx)}>Remove</button>
            </div>
          ))}
          <p>
            <Link href="/checkout">Checkout</Link>
          </p>
        </div>
      )}
    </div>
  );
}
