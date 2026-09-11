const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const inquiryRoutes = require('./routes/inquiries');
const siteSettingsRoutes = require('./routes/siteSettings');

const app = express();

// CORS
const allowedOrigins = [
  'https://www.jaspreetimpex.com',
  'https://jaspreetimpex.com',
  'https://jaspreetimpex.onrender.com',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.removeHeader('X-Powered-By');
  next();
});

// Block sensitive paths
app.use((req, res, next) => {
  const blocked = ['.env', '.git', '.svn', '.htaccess', 'wp-admin', 'wp-login', '.htpasswd', 'config.json', 'docker-compose'];
  const path = req.path.toLowerCase();
  if (blocked.some(b => path.includes(b))) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jaspreet_impex')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/site-settings', siteSettingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve frontend static files
const frontendPath = path.join(__dirname, '..', 'dist');
app.use(express.static(frontendPath));

// Try to serve prerendered HTML for each route (better for SEO)
const prerenderRoutes = ['about-us', 'products', 'contact-us', 'photos'];

app.get('*', (req, res) => {
  const cleanPath = req.path.replace(/\/+$/, '') || '/';

  // Check if a prerendered index.html exists for this route
  for (const route of prerenderRoutes) {
    if (cleanPath === `/${route}` || cleanPath === `/${route}/`) {
      const prerenderedFile = path.join(frontendPath, route, 'index.html');
      if (fs.existsSync(prerenderedFile)) {
        return res.sendFile(prerenderedFile);
      }
    }
  }

  // For root path, serve the prerendered root index.html
  if (cleanPath === '/') {
    const prerenderedRoot = path.join(frontendPath, 'index.html');
    return res.sendFile(prerenderedRoot);
  }

  // SPA fallback for all other routes (admin, API, etc.)
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
