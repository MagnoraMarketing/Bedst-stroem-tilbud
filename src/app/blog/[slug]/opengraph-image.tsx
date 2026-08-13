import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b2545 0%, #123a6b 55%, #1a56b8 100%)",
          fontFamily: "sans-serif",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#0b2545",
              border: "2px solid #ffc93c",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="#ffc93c" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "white" }}>
            {siteConfig.shortName}
            <span style={{ color: "#ffc93c" }}>.dk</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              color: "#ffc93c",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {post.category}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "white",
              maxWidth: 1000,
            }}
          >
            {post.title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
