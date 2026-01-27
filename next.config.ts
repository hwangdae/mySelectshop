import { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
    {
      protocol: "http",
      hostname: "res.cloudinary.com",
    },
    ],
  },
};

export default withBundleAnalyzer({
  enabled : process.env.ANALYZE ==='true',
})(nextConfig)

// export default nextConfig;
