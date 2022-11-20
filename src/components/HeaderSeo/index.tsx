import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface HeaderSeo {
  title: string;
  description: string;
}

const HeaderSeo = ({ title, description }: HeaderSeo) => {
  const router = useRouter();
  const mainUrl = process.env.NEXT_PUBLIC_MAIN_URL;
  const url = `${mainUrl}${router.asPath}`;
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"
      />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${mainUrl}/logo.png`} />
      <meta
        name="google-site-verification"
        content="JpD5IYYfIsIi9-qeUo49jXVsC4ouIdqJ4bi2dlQMzxg"
      />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} />
      <link rel="apple-touch-icon" href={`${mainUrl}/logo.png`} />
    </Head>
  );
};

export default HeaderSeo;
