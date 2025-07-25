import mongoose from 'mongoose';

const connectDB = async (mongoURI) => {
  // --- DIAGNOSTIC TEST ---
  console.log('--- Inside connectDB ---');
  console.log('Received URI is:', mongoURI);
  console.log('------------------------');

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
