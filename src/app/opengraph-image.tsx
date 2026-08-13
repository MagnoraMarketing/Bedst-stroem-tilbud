import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0b2545 0%, #123a6b 55%, #1a56b8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: 20,
              background: "#0b2545",
              border: "3px solid #ffc93c",
            }}
          >
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="#ffc93c" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "white" }}>
            {siteConfig.shortName}
            <span style={{ color: "#ffc93c" }}>.dk</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 34,
            color: "#e8f1fc",
            textAlign: "center",
            maxWidth: 880,
          }}
        >
          Sammenlign elpriser og find dit billigste elselskab
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 24,
            color: "#ffc93c",
            fontWeight: 600,
          }}
        >
          100% gratis · Uforpligtende · Op til 3 tilbud
        </div>
      </div>
    ),
    { ...size }
  );
}
