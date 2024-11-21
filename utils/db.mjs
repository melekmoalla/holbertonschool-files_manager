import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri);
    this.db = null;

    // Initialize connection
    this.connect(database);
  }

  async connect(database) {
    try {
      await this.client.connect();
      this.db = this.client.db(database);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  isAlive() {
    // Return true if the client is connected and the database is initialized
    return this.client && this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    if (!this.db) return 0;
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    if (!this.db) return 0;
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
