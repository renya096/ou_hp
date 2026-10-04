import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // 旧シングルページのアンカー（/#services 等）は新URLへ。ハッシュはサーバーに届かないため、
    // 旧サイトの導線で使われていたパスだけを301する。
    return [
      { source: "/services/bodyguard", destination: "/protection", permanent: true },
      { source: "/services/bodyguard/:path*", destination: "/protection/:path*", permanent: true },
      { source: "/recruit/protection", destination: "/recruit/bodyguard", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/(.*)", headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ] },
    ];
  },
};

export default nextConfig;
