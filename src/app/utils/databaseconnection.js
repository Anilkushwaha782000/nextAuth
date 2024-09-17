
import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/yourDatabaseName';

let isConnected = false;

async function connectToDatabase() {
  if(isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export default connectToDatabase;
