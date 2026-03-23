/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: "/product/how-HeyKrish-works",
        destination: "/product/how-krish-works",
        permanent: true
      },
      {
        source: "/product/what-HeyKrish-can-do",
        destination: "/product/what-krish-can-do",
        permanent: true
      },
      {
        source: "/compare/freelancers-vs-HeyKrish",
        destination: "/compare/freelancers-vs-krish",
        permanent: true
      },
      {
        source: "/compare/shopify-agencies-vs-HeyKrish",
        destination: "/compare/shopify-agencies-vs-krish",
        permanent: true
      },
      {
        source: "/compare/task-services-vs-HeyKrish",
        destination: "/compare/task-services-vs-krish",
        permanent: true
      },
      {
        source: "/compare/storetasker-vs-HeyKrish",
        destination: "/compare/storetasker-vs-krish",
        permanent: true
      },
      {
        source: "/compare/taskhusky-vs-HeyKrish",
        destination: "/compare/taskhusky-vs-krish",
        permanent: true
      },
      {
        source: "/resources/case-studies",
        destination: "/use-cases",
        permanent: true
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
