import mongoose from 'mongoose';

type Connection = {
  isConnected?: number,
};

const connection: Connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  if (process.env.MONGODB_URI === undefined) {
    throw new Error('undefined MongoDB URI');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.VERCEL_ENV === 'production' ? '42_blog' : '42_blog_development',
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw error;
  }
}

export default dbConnect;
