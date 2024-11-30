import pkg from 'mongodb';
const { MongoClient } = pkg;

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = null;
  }

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

  // Properly handle isAlive check
  async isAlive() {
    // If the database client is not initialized, attempt to connect
    if (this.db === null) {
      const connectionSuccess = await this.connect();
      if (!connectionSuccess) {
        return false; // If the connection fails, return false
      }
    }
  
    try {
      // Ping MongoDB server to check if it's alive
      await this.db.command({ ping: 1 });
      return true; // If no error occurs, MongoDB is alive
    } catch (error) {
      // If pinging fails, return false
      console.error('Error pinging MongoDB:', error);
      return false;
    }
  }
  

  // Get number of users
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

  // Get number of files
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

const dbClient = new DBClient();
export default dbClient;

