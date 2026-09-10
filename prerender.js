import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');

const routes = [
  {
    path: '/',
    title: 'Jaspreet Impex (GEE TEC) | Automotive Components & Metal Fasteners Manufacturer India',
    description: 'Jaspreet Impex (GEE TEC) - Leading manufacturer and exporter of precision automotive components, brake parts, clutch parts, metal washers, and fasteners from India. 15+ years experience, ISO 9002 certified, serving 40+ countries.',
    keywords: 'automotive components manufacturer India, metal fasteners exporter, brake parts India, clutch components, metal washers manufacturer, GEE TEC, Jaspreet Impex, Phagwara, Punjab, ISO 9002 certified',
  },
  {
    path: '/about-us',
    title: 'About Us - Jaspreet Impex (GEE TEC) | ISO 9002 Certified Manufacturer',
    description: 'Learn about Jaspreet Impex (GEE TEC) - trusted manufacturer of automotive components since 2009. ISO 9002 certified, serving 40+ countries with precision engineering.',
    keywords: 'about Jaspreet Impex, GEE TEC history, ISO 9002 manufacturer India, automotive components company Punjab',
  },
  {
    path: '/products',
    title: 'Our Products - Jaspreet Impex | Brake Parts, Clutch Components, Metal Washers, Fasteners',
    description: 'Explore our range of precision automotive components: brake parts, clutch components, engine parts, metal washers, and industrial fasteners. ISO certified, export quality.',
    keywords: 'brake components India, clutch parts manufacturer, metal washers supplier, industrial fasteners India, automotive spare parts',
  },
  {
    path: '/contact-us',
    title: 'Contact Us - Jaspreet Impex | Get Quote for Automotive Components',
    description: 'Contact Jaspreet Impex for automotive components inquiries. Phone: +91 98765 43210. Email: info@jaspreetimpex.com. Located in Phagwara, Punjab, India.',
    keywords: 'contact Jaspreet Impex, automotive components inquiry, GEE TEC contact, quote for brake parts',
  },
  {
    path: '/photos',
    title: 'Photos - Jaspreet Impex | Manufacturing Facility & Products Gallery',
    description: 'View photos of Jaspreet Impex manufacturing facility, automotive components, metal washers, and fasteners production in Phagwara, Punjab, India.',
    keywords: 'Jaspreet Impex photos, automotive components factory India, metal washers manufacturing, GEE TEC facility',
  },
];

function setMetaTag(html, name, content) {
  const escapedContent = content.replace(/"/g, '&quot;');
  const isProperty = name.startsWith('og:') || name.startsWith('twitter:');

  const tagPattern = isProperty
    ? new RegExp(`<meta\\s+property="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s+content="[^"]*"\\s*/?>`, 'i')
    : new RegExp(`<meta\\s+name="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s+content="[^"]*"\\s*/?>`, 'i');

  const newTag = isProperty
    ? `<meta property="${name}" content="${escapedContent}" />`
    : `<meta name="${name}" content="${escapedContent}" />`;

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, newTag);
  }
  return html;
}

function setTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
}

function setCanonical(html, url) {
  const canonicalPattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  const newCanonical = `<link rel="canonical" href="${url}" />`;
  if (canonicalPattern.test(html)) {
    return html.replace(canonicalPattern, newCanonical);
  }
  return html;
}

console.log('Prerendering routes...');

const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

for (const route of routes) {
  const routeDir = resolve(distDir, route.path === '/' ? '.' : route.path.replace(/^\//, ''));

  if (!existsSync(routeDir)) {
    mkdirSync(routeDir, { recursive: true });
  }

  const canonicalUrl = `https://jaspreetimpex.com${route.path === '/' ? '' : route.path}`;
  let routeHtml = indexHtml;

  routeHtml = setTitle(routeHtml, route.title);
  routeHtml = setMetaTag(routeHtml, 'title', route.title);
  routeHtml = setMetaTag(routeHtml, 'description', route.description);
  routeHtml = setMetaTag(routeHtml, 'keywords', route.keywords);
  routeHtml = setMetaTag(routeHtml, 'og:title', route.title);
  routeHtml = setMetaTag(routeHtml, 'og:description', route.description);
  routeHtml = setMetaTag(routeHtml, 'og:url', canonicalUrl);
  routeHtml = setMetaTag(routeHtml, 'twitter:title', route.title);
  routeHtml = setMetaTag(routeHtml, 'twitter:description', route.description);
  routeHtml = setCanonical(routeHtml, canonicalUrl);

  writeFileSync(resolve(routeDir, 'index.html'), routeHtml, 'utf-8');
  console.log(`  ✓ ${route.path || '/'} -> ${routeDir}/index.html`);
}

console.log(`\nPrerendered ${routes.length} routes successfully!`);
