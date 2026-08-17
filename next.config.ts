import type { NextConfig } from "next";

const portfolioOrigin = process.env.PORTFOLIO_ORIGIN?.replace(/\/$/, "");
const portfolioCanary = {
  type: "cookie" as const,
  key: "portfolio-zone",
  value: "standalone",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/who-we-are/vicente-barrientos",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/who-we-are/benjamin-mahave",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/meet-the-team/benjamin-mahave",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/meet-the-team/vicente-barrientos",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/resumex",
        destination: "https://resumex.talentxrecruiting.com",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: portfolioOrigin
        ? [
            {
              source: "/portfolio",
              destination: `${portfolioOrigin}/portfolio`,
              has: [portfolioCanary],
            },
            {
              source: "/portfolio/:path+",
              destination: `${portfolioOrigin}/portfolio/:path+`,
              has: [portfolioCanary],
            },
            {
              source: "/portfolio-static/:path+",
              destination: `${portfolioOrigin}/portfolio-static/:path+`,
              has: [portfolioCanary],
            },
          ]
        : [],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
