const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [
      "s3.ap-southeast-1.amazonaws.com",
      "dummyimage.com",
      "s3.eu-west-3.amazonaws.com",
      "media-dev2074.ganni-repeat.com",
      "media-dev.reflaunt.com",
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
