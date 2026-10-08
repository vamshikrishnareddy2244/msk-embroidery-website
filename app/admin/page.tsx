"use client";

import { useEffect, useState } from "react";

type Product = {
  id?: number;
  name: string;
  type: string;
  tag?: string;
  icon?: string;
  image: string;
  description?: string;
};

const defaults: Product[] = [
  { name: "Single Head Embroidery Machine", type: "Embroidery Machines", image: "/single-head-embroidery.jpg" },
  { name: "Double Head Embroidery Machine", type: "Embroidery Machines", image: "/double-head-embroidery.jpg" },
  { name: "Double Bead Machine", type: "Bead Machines", image: "" },
  { name: "Triple Bead Machine", type: "Bead Machines", image: "" },
  { name: "Four Bead Machine", type: "Bead Machines", image: "/four-bead-machine.jpg" },
  { name: "4 Bead 2 Sequence Device", type: "Devices", image: "" },
];

export default function Admin() {
  const [items, setItems] = useState<Product[]>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.ok ? r.json() : Promise.reject(new Error("Could not load products")))
      .then(data => { if (Array.isArray(data)) setItems(data); })
      .catch(err => setMessage(err.message))
      .finally(() => setLoading(false));
  }, []);

  function update(index: number, key: keyof Product, value: string) {
    setItems(current => current.map((item, i) => i === index ? { ...item, [key]: value } : item));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save products");
      setItems(data);
      setMessage("Products saved to MySQL successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save products");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f4f1ea", padding: "50px 7vw", fontFamily: "Arial" }}>
      <h1>MSK Product Admin</h1>
      <p>Edit product information. Changes are stored in your MySQL database.</p>
      {loading ? <p>Loading products...</p> : items.map((item, i) => (
        <div key={item.id ?? i} style={{ background: "#fff", padding: 20, margin: "12px 0", borderRadius: 12, display: "grid", gap: 10 }}>
          <input value={item.name} onChange={e => update(i, "name", e.target.value)} placeholder="Product name" />
          <input value={item.type} onChange={e => update(i, "type", e.target.value)} placeholder="Category" />
          <input value={item.image} onChange={e => update(i, "image", e.target.value)} placeholder="/image-file.jpg" />
          <input value={item.description ?? ""} onChange={e => update(i, "description", e.target.value)} placeholder="Description" />
        </div>
      ))}
      <button onClick={save} disabled={saving || loading} style={{ padding: "14px 20px", border: 0, borderRadius: 999, background: "#d8aa63", fontWeight: 700, cursor: "pointer" }}>
        {saving ? "Saving..." : "Save Products to MySQL"}
      </button>
      {message && <p style={{ marginTop: 16, fontWeight: 700 }}>{message}</p>}
      <p><a href="/">← Back to website</a></p>
    </main>
  );
}
