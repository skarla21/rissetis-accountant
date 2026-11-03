import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.taxheaven.gr",
      },
      {
        protocol: "https",
        hostname: "taxheaven.gr",
      },
      {
        protocol: "https",
        hostname: "www.gov.gr",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
