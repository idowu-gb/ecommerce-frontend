import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then((r) => r.json())
      .then(setProduct);
  }, [id]);
  if (!product) return <div>Loading...</div>;
  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <img src={product.image || "/placeholder.png"} style={{ width: 400 }} />
      <p>{product.description}</p>
      <p>£{product.price}</p>
      <button
        onClick={() => {
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
          cart.push({ product_id: product.id, quantity: 1, product });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Added to cart");
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
