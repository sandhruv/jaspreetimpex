const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MONGODB_URI = 'mongodb://jaspreet:Jaspreet123!@ac-odhesqz-shard-00-00.mcy6ifs.mongodb.net:27017/jaspreet_impex?authSource=admin&retryWrites=true&w=majority&tls=true';
const JWT_SECRET = 'jaspreet_impex_jwt_secret_key_2024';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  company: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  features: [String],
  specifications: { material: String, size: String, finish: String, quantity: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Create admin user
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
        { name: 'Air Freight', category: 'freight', description: 'Fast and secure air cargo services for urgent international shipments and high-value goods.', features: ['Express Handling', 'Global Air Cargo', 'Real-Time Tracking'] },
        { name: 'Sea Freight (FCL & LCL)', category: 'freight', description: 'Full Container Load and Less than Container Load sea cargo services with efficient port coordination.', features: ['FCL & LCL', 'Global Ports', 'Container Shipping'] },
        { name: 'Import Clearance', category: 'customs', description: 'Efficient handling of all import documentation and regulatory requirements.', features: ['Documentation', 'Duty Optimization', 'Fast Processing'] },
        { name: 'Export Clearance', category: 'customs', description: 'Streamlined export processes ensuring compliance and timely shipment.', features: ['Export Licenses', 'Compliance', 'Quick Turnaround'] },
        { name: 'Storage Solutions', category: 'warehouse', description: 'Flexible warehouse space tailored to your inventory requirements.', features: ['Secure Storage', 'Climate Control', 'Scalable Space'] },
        { name: 'DG Shipment Handling', category: 'specialized', description: 'Specialized handling of dangerous goods with strict compliance to IMCO regulations.', features: ['IMCO Classes', 'Safety Protocols', 'Certified Handlers'] }
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
