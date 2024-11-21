import { MongoClient } from 'mongodb';


class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        const url = `mongodb://${host}:${port}`;

        this.client = new MongoClient(url);
    
        this.client.connect()
          .then(() => {
            this.db = this.client.db(database); // Set the database reference
            console.log('Connected to MongoDB successfully');
          })
          .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
            this.db = null;
          });
      }

    isAlive() {
        return this.client && this.client.topology && this.client.topology.isConnected();
    }
    
      async nbUsers() {
        if (!this.db) return 0;
        const collection = this.db.collection('users');
        return collection.countDocuments();
      }  

      async nbUsers() {
        if (!this.db) return 0;
        const collection = this.db.collection('files');
        return collection.countDocuments();
      }
    

}

const DBClient = new dbClient();
export default DBClient;
