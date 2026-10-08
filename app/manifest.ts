import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MSK Embroidery Machine",
    short_name: "MSK Embroidery",
    description: "Technician-built embroidery and bead machines with no compromise in service.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1ea",
    theme_color: "#d8aa63",
    icons: [{ src: "/msk-logo.png", sizes: "any", type: "image/png" }]
  };
}
