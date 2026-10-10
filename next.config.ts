import type { NextConfig } from "next";

const CANONICAL_HOST = "billigelrengning.dk";

const nextConfig: NextConfig = {
  // Send traffic from the old Vercel address and the www subdomain to the
  // canonical bare domain, so search engines only index one version.
  async redirects() {
    return ["bedst-stroem-tilbud.vercel.app", "www.billigelrengning.dk"].map(
      (host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      })
    );
  },
};

export default nextConfig;
