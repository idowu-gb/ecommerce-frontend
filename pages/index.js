import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((r) => r.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <>
      <Head>
        <title>Übermensch</title>
        <meta
          name="description"
          content="Simple e-commerce with Next.js + Django"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <h1>Übermensch</h1>

          {/* Product grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              width: "100%",
              maxWidth: 900,
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 10,
                  textAlign: "center",
                }}
              >
                <Image
                  src={p.image || "/next.svg"}
                  alt={p.name}
                  width={200}
                  height={150}
                  style={{ objectFit: "cover" }}
                />
                <h3>{p.name}</h3>
                <p>£{p.price}</p>
                <Link href={`/product/${p.id}`}>View</Link>
                <br />
                <button
                  onClick={() => {
                    const cart = JSON.parse(
                      localStorage.getItem("cart") || "[]"
                    );
                    cart.push({ product_id: p.id, quantity: 1, product: p });
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert("Added to cart");
                  }}
                  style={{ marginTop: 10 }}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 20 }}>
            <Link href="/cart">Go to cart</Link>
          </p>
        </main>
      </div>
    </>
  );
}
