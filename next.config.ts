import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/who-we-are/vicente-barrientos",
        destination: "/meet-the-team/vicente-barrientos",
        permanent: true,
      },
      {
        source: "/who-we-are/benjamin-mahave",
        destination: "/meet-the-team/benjamin-mahave",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
