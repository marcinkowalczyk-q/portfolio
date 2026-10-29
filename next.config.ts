import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old Webflow slug (one "n") → current route
      {
        source: "/:locale(pl|en)/baner-configurator",
        destination: "/:locale/banner-configurator",
        permanent: true,
      },
      // Old Webflow URL had no locale prefix; go straight to the default locale
      {
        source: "/baner-configurator",
        destination: "/pl/banner-configurator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
