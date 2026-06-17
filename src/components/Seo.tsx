import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string;
  canonical?: string;
  author?: string;
  type?: string;
}

const BASE_TITLE = 'FinCalcHub';
const BASE_URL = 'https://fincalchub.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

const Seo: React.FC<SeoProps> = ({ 
  title, 
  description, 
  url = BASE_URL,
  image = DEFAULT_IMAGE,
  keywords = 'financial calculator, loan calculator, SIP calculator, retirement planning, personal finance, Indian finance',
  canonical = url,
  author = 'FinCalcHub Team',
  type = 'website'
}) => {
  const fullTitle = title === 'Home' ? BASE_TITLE : `${title} | ${BASE_TITLE}`;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: fullTitle,
    description: description,
    url: canonical,
    image: image,
    ...(type !== 'article' && {
      publisher: {
        '@type': 'Organization',
        name: BASE_TITLE,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`
        }
      }
    })
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      
      {/* Essential Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={BASE_TITLE} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default Seo;
