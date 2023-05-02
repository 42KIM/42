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

  const db = await mongoose.connect(process.env.MONGODB_URI, { dbName: '42_blog' });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
