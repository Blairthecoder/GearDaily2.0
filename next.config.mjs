/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/product-page/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/behind-the-design",
        permanent: true,
      },
      {
        source: "/post/behind-the-design-trust-god-when-you-don-t-have-the-full-plan",
        destination: "/behind-the-design/trust-god",
        permanent: true,
      },
      {
        source: "/post/behind-the-design-i-am-free-inspired-by-resurrection-sunday-and-the-victory-over-sin",
        destination: "/behind-the-design/i-am-free",
        permanent: true,
      },
      {
        source: "/post/behind-the-design-g-e-a-r-the-armor-t-shirt",
        destination: "/behind-the-design/the-armor",
        permanent: true,
      },
      {
        source: "/post/behind-the-design-love-is-put-love-into-action",
        destination: "/products/love-is",
        permanent: true,
      },
      {
        source: "/post/behind-the-design-god-is-enough-confidence-without-the-noise",
        destination: "/products/god-is-enough",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
