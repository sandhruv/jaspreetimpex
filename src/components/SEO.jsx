import { useEffect } from 'react';

const SEO = ({ title, description, keywords, url, type = 'website' }) => {
  useEffect(() => {
    document.title = title || 'Jaspreet Impex (GEE TEC) | Automotive Components & Metal Fasteners';

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    if (url) {
      setMeta('og:url', url);
      setMeta('og:title', title);
      setMeta('og:description', description);
      setMeta('og:type', type);
      setMeta('twitter:url', url);
      setMeta('twitter:title', title);
      setMeta('twitter:description', description);
    }
  }, [title, description, keywords, url, type]);

  return null;
};

export default SEO;
