import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static  getStatus(req, res) {
    return res.status(500).json({ redis: false, db: true });
  }
  static async getStats(req, res) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    res.status(200).send(stats);
  }
}

export default AppController;