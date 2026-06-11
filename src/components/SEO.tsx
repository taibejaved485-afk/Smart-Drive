import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&auto=format&fit=crop",
  ogType = "website",
  schema
}: SEOProps) {
  useEffect(() => {
    // 1. Dynamic document title
    document.title = `${title} | Smart Drive Driving School`;
    
    // Helper function to update/create meta tags dynamically
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const searchAttr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${searchAttr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(searchAttr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Base Description & Keywords SEO
    updateMeta('description', description);
    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // 3. Open Graph (OG) Facebook & Telegram optimization
    updateMeta('og:title', `${title} | Smart Drive`, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:type', ogType, true);

    // 4. Twitter optimization
    updateMeta('twitter:title', `${title} | Smart Drive`);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);

    // 5. Canonical link tag configuration
    let linkElement = document.querySelector('link[rel="canonical"]');
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('href', canonical || window.location.href);

    // 6. JSON-LD Structured Data Schema Insertion
    const existingSchema = document.getElementById('seo-schema-jsonld');
    if (existingSchema) {
      existingSchema.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'seo-schema-jsonld';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup schemas on page transitions
    return () => {
      const exisitingSchemaOnUnmount = document.getElementById('seo-schema-jsonld');
      if (exisitingSchemaOnUnmount) {
        exisitingSchemaOnUnmount.remove();
      }
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schema]);

  return null;
}
