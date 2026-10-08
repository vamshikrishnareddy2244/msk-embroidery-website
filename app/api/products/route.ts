import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaults = [
  { name: "Single Head Embroidery Machine", type: "Embroidery Machines", tag: "SINGLE HEAD", icon: "01", image: "/single-head-embroidery.jpg", description: "Compact, reliable embroidery production for growing businesses." },
  { name: "Double Head Embroidery Machine", type: "Embroidery Machines", tag: "DOUBLE HEAD", icon: "02", image: "/double-head-embroidery.jpg", description: "Higher productivity with dual-head embroidery performance." },
  { name: "Double Bead Machine", type: "Bead Machines", tag: "DOUBLE BEAD", icon: "03", image: "", description: "Bead attachment solution for detailed decorative production." },
  { name: "Triple Bead Machine", type: "Bead Machines", tag: "TRIPLE BEAD", icon: "04", image: "", description: "Multi-bead production for efficient decorative work." },
  { name: "Four Bead Machine", type: "Bead Machines", tag: "FOUR BEAD", icon: "05", image: "/four-bead-machine.jpg", description: "Four-bead capability for advanced embellishment requirements." },
  { name: "4 Bead 2 Sequence Device", type: "Devices", tag: "4 BEAD • 2 SEQUENCE", icon: "06", image: "", description: "A dedicated 4-bead, 2-sequence device for production flexibility." },
];

async function ensureDefaults() {
  const count = await prisma.product.count();
  if (count === 0) await prisma.product.createMany({ data: defaults });
}

export async function GET() {
  try {
    await ensureDefaults();
    const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products", error);
    return NextResponse.json({ error: "Unable to load products" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body.products)) {
      return NextResponse.json({ error: "products must be an array" }, { status: 400 });
    }

    for (const item of body.products) {
      if (!item.name || !item.type) continue;
      await prisma.product.upsert({
        where: { name: item.name },
        update: {
          type: item.type,
          tag: item.tag || item.name.toUpperCase(),
          icon: item.icon || "00",
          image: item.image || "",
          description: item.description || "MSK product — contact us for specifications and quote.",
        },
        create: {
          name: item.name,
          type: item.type,
          tag: item.tag || item.name.toUpperCase(),
          icon: item.icon || "00",
          image: item.image || "",
          description: item.description || "MSK product — contact us for specifications and quote.",
        },
      });
    }

    const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(products);
  } catch (error) {
    console.error("PUT /api/products", error);
    return NextResponse.json({ error: "Unable to save products" }, { status: 500 });
  }
}
