import type { NextConfig } from "next";

const portfolioOrigin = process.env.PORTFOLIO_ORIGIN?.replace(/\/$/, "");

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
            },
            {
              source: "/portfolio/:path+",
              destination: `${portfolioOrigin}/portfolio/:path+`,
            },
            {
              source: "/portfolio-static/:path+",
              destination: `${portfolioOrigin}/portfolio-static/:path+`,
            },
          ]
        : [],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
