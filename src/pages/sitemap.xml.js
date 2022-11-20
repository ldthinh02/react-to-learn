import React from "react";

const sitemapUrl = `https://s3.eu-west-3.amazonaws.com/${process.env.NEXT_PUBLIC_MEDIA_BUCKET_NAME}/sitemap/sitemap.xml`;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const response = await fetch(sitemapUrl);
    const sitemapContent = await response.text();
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapContent);
    res.end();
  }
}

export default Sitemap;
