import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // Get values from environment variables with default fallback
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    
    // MongoDB URI format
    const uri = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Database reference
    this.db = null;
  }

  // Connect to MongoDB
  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.database);
      return true;
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      return false;
    }
  }

  // Check if the MongoDB connection is alive
  async isAlive() {
    try {
      // Ping MongoDB to check connection status
      if (!this.db) {
        // If DB isn't connected, attempt to connect first
        await this.connect();
      }
      await this.db.command({ ping: 1 });
      return true;
    } catch (err) {
      console.error('MongoDB is not alive:', err);
      return false;
    }
  }

  // Get the number of users in the users collection
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (err) {
      console.error('Failed to get user count:', err);
      return 0;
    }
  }

  // Get the number of files in the files collection
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (err) {
      console.error('Failed to get file count:', err);
      return 0;
    }
  }
}

// Exporting a single instance of DBClient
const dbClient = new DBClient();
export default dbClient;
