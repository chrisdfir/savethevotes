import { writeFileSync } from "fs";

const url = process.argv[2] || "http://localhost:3000/og";

async function exportOg() {
  console.log(`Fetching OG image from ${url}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync("public/og-image.png", buffer);
  console.log(`Saved to public/og-image.png (${buffer.length} bytes)`);
}

exportOg().catch((e) => {
  console.error(e);
  process.exit(1);
});
