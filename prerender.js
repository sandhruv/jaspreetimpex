import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');

const routes = [
  {
    path: '/',
    title: 'Jaspreet Impex | Logistics Solutions - Freight Forwarding, Customs Clearance India',
    description: 'Jaspreet Impex - Leading logistics company in India offering freight forwarding, customs clearance, warehousing, and supply chain management. 22+ years experience, serving 50+ countries.',
    keywords: 'logistics company India, freight forwarding India, customs clearance services, supply chain management, Jaspreet Impex, Phagwara, Punjab',
  },
  {
    path: '/about-us',
    title: 'About Us - Jaspreet Impex | Logistics Company',
    description: 'Learn about Jaspreet Impex - trusted logistics partner since 2003. Serving 50+ countries with freight forwarding, customs clearance, and supply chain solutions.',
    keywords: 'about Jaspreet Impex, logistics company Punjab, customs house agent India',
  },
  {
    path: '/products',
    title: 'Our Services - Jaspreet Impex | Freight, Customs, Warehousing, Supply Chain',
    description: 'Explore our logistics services: freight forwarding (air, sea, road), customs clearance, warehousing & distribution, and specialized logistics including DG handling and e-commerce.',
    keywords: 'freight forwarding India, customs clearance services, warehousing solutions, DG shipment handling, logistics services',
  },
  {
    path: '/contact-us',
    title: 'Contact Us - Jaspreet Impex | Get Quote for Logistics Services',
    description: 'Contact Jaspreet Impex for logistics inquiries. Phone: +91 98767 03899. Email: info@jaspreetimpex.com. Located in Phagwara, Punjab, India.',
    keywords: 'contact Jaspreet Impex, logistics inquiry, freight forwarding quote, customs clearance',
  },
  {
    path: '/photos',
    title: 'Our Operations - Jaspreet Impex | Logistics Facilities Gallery',
    description: 'View photos of Jaspreet Impex logistics operations, warehouse facilities, container terminal, cargo ship, and fleet management in India.',
    keywords: 'Jaspreet Impex photos, logistics operations India, warehouse facility, container terminal',
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
