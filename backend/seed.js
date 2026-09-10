const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jaspreet_impex');

    // Create single admin user
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'Sunil Chauhan',
        email: 'sunilchauhan@gmail.com',
        password: '1234567890-',
        role: 'admin',
        company: 'Jaspreet Impex'
      });
      console.log('Admin user created: sunilchauhan@gmail.com / 1234567890-');
    } else {
      console.log('Admin user already exists');
    }

    // Create sample products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany([
        {
          name: 'Brake Components',
          category: 'automotive',
          description: 'High-performance brake parts including pads, discs, and calipers designed for safety and durability.',
          features: ['ISO 9002 Certified', 'Heat Resistant', 'Long Lifespan']
        },
        {
          name: 'Clutch Parts',
          category: 'automotive',
          description: 'Precision-machined clutch components ensuring smooth transmission operation.',
          features: ['Precision Machined', 'Wear Resistant', 'OEM Specifications']
        },
        {
          name: 'Engine Components',
          category: 'automotive',
          description: 'Critical engine parts manufactured with exact specifications for optimal performance.',
          features: ['High Precision', 'Temperature Stable', 'Premium Quality']
        },
        {
          name: 'Flat Washers',
          category: 'washers',
          description: 'Standard flat washers for load distribution and surface protection.',
          features: ['Various Sizes', 'Zinc Plated', 'Stainless Options']
        },
        {
          name: 'Spring Washers',
          category: 'washers',
          description: 'Lock washers designed to prevent loosening under vibration.',
          features: ['Vibration Proof', 'High Tension', 'Durable']
        },
        {
          name: 'Metal Fasteners',
          category: 'other',
          description: 'Complete range of bolts, nuts, and screws for various applications.',
          features: ['Multiple Grades', 'Corrosion Resistant', 'ISO Certified']
        }
      ]);
      console.log('Sample products created');
    } else {
      console.log('Products already exist');
    }

    console.log('Seeding completed!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
