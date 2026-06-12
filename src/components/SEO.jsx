// components/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { fetchSEOData } from '../services/seoService';

const SEO = ({ pageType, customData = {} }) => {
  const [seoData, setSeoData] = useState({ settings: {}, pages: [] });
  
  useEffect(() => {
    fetchSEOData.seoData().then(data => setSeoData(data));
  }, []);

  const page = seoData.pages.find(p => p.pageType === pageType);
  console.log('SEO Component - pageType:', pageType, 'page data:', page, 'settings:', seoData.settings);
  const settings = seoData.settings;

  const title = customData.title || page?.title || settings.siteName;
  const description = customData.description || page?.description || settings.defaultDescription;
  const image = customData.image || page?.ogImage || settings.defaultImage;
  const url = customData.url || `${settings.siteUrl}${pageType === 'home' ? '' : `/${pageType}`}`;
  const keywords = customData.keywords || page?.keywords || '';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={settings.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={settings.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEO;