import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.client = new MongoClient(`mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}`);
    this.db = null;
  }

  // Connect to MongoDB
  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.DB_DATABASE || 'files_manager');
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      return false;
    }
  }

  // Check if MongoDB connection is alive
  isAlive() {
    return this.db !== null;
  }

  // Get number of users
  async nbUsers() {
    if (this.isAlive()) {
      return await this.db.collection('users').countDocuments();
    }
    throw new Error('MongoDB not connected');
  }

  // Get number of files
  async nbFiles() {
    if (this.isAlive()) {
      return await this.db.collection('files').countDocuments();
    }
    throw new Error('MongoDB not connected');
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
