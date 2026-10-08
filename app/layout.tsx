import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "MSK Embroidery Machine | Excellence in Every Stitch",
  description: "MSK Embroidery Machine — technician-built embroidery and bead machines with no compromise in service and all-India delivery.",
  keywords: ["MSK Embroidery Machine", "embroidery machine", "double head embroidery machine", "bead machine", "India"],
  openGraph: { title: "MSK Embroidery Machine", description: "Excellence in Every Stitch.", type: "website", images: ["/msk-logo.png"] }, icons: { icon: "/msk-logo.png", apple: "/msk-logo.png" }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
