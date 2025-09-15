import { useState, useEffect } from "react";
export default function Checkout() {
  const [items, setItems] = useState([]);
  useEffect(
    () => setItems(JSON.parse(localStorage.getItem("cart") || "[]")),
    []
  );
  async function submitOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }
    const payload = {
      items: items.map((i) => ({
        product_id: i.product_id,
        quantity: i.quantity,
      })),
    };
    const res = await fetch("http://localhost:8000/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      localStorage.removeItem("cart");
      alert("Order placed!");
    } else {
      alert("Order failed, maybe you need to login or backend error");
    }
  }
  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout</h1>
      {items.map((i, idx) => (
        <div key={idx}>
          {i.product.name} x {i.quantity}
        </div>
      ))}
      <button onClick={submitOrder}>Place Order</button>
    </div>
  );
}
