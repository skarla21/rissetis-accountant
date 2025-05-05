import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.taxheaven.gr"], // add other sources if needed
  },
};

export default withNextIntl(nextConfig);
