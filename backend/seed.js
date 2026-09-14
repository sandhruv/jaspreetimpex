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
          name: 'Air Freight',
          category: 'freight',
          description: 'Fast and secure air cargo services for urgent international shipments and high-value goods.',
          features: ['Express Handling', 'Global Air Cargo', 'Real-Time Tracking']
        },
        {
          name: 'Sea Freight (FCL & LCL)',
          category: 'freight',
          description: 'Full Container Load and Less than Container Load sea cargo services with efficient port coordination.',
          features: ['FCL & LCL', 'Global Ports', 'Container Shipping']
        },
        {
          name: 'Import Clearance',
          category: 'customs',
          description: 'Efficient handling of all import documentation and regulatory requirements.',
          features: ['Documentation', 'Duty Optimization', 'Fast Processing']
        },
        {
          name: 'Export Clearance',
          category: 'customs',
          description: 'Streamlined export processes ensuring compliance and timely shipment.',
          features: ['Export Licenses', 'Compliance', 'Quick Turnaround']
        },
        {
          name: 'Storage Solutions',
          category: 'warehouse',
          description: 'Flexible warehouse space tailored to your inventory requirements.',
          features: ['Secure Storage', 'Climate Control', 'Scalable Space']
        },
        {
          name: 'DG Shipment Handling',
          category: 'specialized',
          description: 'Specialized handling of dangerous goods with strict compliance to IMCO regulations.',
          features: ['IMCO Classes', 'Safety Protocols', 'Certified Handlers']
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
